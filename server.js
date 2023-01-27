const inquirer = require('inquirer');
// Import and require mysql2/dependencies
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'August@1026',
    database: 'department_db',
    port: 3000
  },
  console.log(`Connected to the department_db database.`)
);

Connection.connect(function (err){
  if (err) throw err;
  startList();
});

function startList(){
  inquirer .prompt ({
    type: 'list',
    size: 10,
    name: 'perogative',
    mesage: 'Rolodex Options',
    choices: [
      'view depts',
      'view role',
      'view employees',
      'Im done'
    ]
  })
  .then(function ({ task }) {
    switch(task); {
      case "View all Departments"
        showAllDepartments();
        break;
      
      case "View all Roles"
        showAllRoles();
        break;

      case "View all Employees"
        showAllEmployees();
        break;
     
      case "I don't need anything else."
          console.log("\nThank you.")
          connection.end();
          break;
    }
  }
    )



// ShowAllDepartments function
function showAllDepartments() {
  console.log('Department List:\n');

  let query = `
      SELECT name as "Department",
      id as "Department ID"
      FROM departments
      ;`
      
      connection.query(query, function (err, res) {
          if (err) throw err;
      
          console.table(res);        
          initialList();
  });
      
}

function showAllRoles() {
  console.log('All Roles:\n');

  let query = `
      SELECT role.title AS "Job Title",
          role.id AS "Job ID",
          dept.name AS "Department",
          role.salary AS "Salary"
      FROM roles role
      JOIN departments dept
      ON role.department_id=dept.id
      ;`
      
      connection.query(query, function (err, res) {
          if (err) throw err;
      
          console.table(res);        
          initialList();
  });       
}

function showAllEmployees() {
  console.log('Here are all the employees I have:\n');

  let query =`
      SELECT emp.id AS "Employee ID",
          emp.first_name AS "First Name",
          emp.last_name AS "Last Name",
          role.title AS "Job Title",
          dept.name AS "Department",
          role.salary AS "Salary",
          CASE WHEN emp.manager_id IS NULL THEN "Self"
           ELSE CONCAT(man.first_name," ", man.last_name)
           END AS "Manager"
      FROM employees emp
      LEFT JOIN roles role
          ON emp.role_id=role.id
      LEFT JOIN departments dept
          ON role.department_id=dept.id
      LEFT JOIN employees man
          ON man.id=emp.manager_id
      GROUP BY emp.id,
          CASE WHEN emp.manager_id IS NULL THEN "Self"
          WHEN emp.manager_id = emp.id THEN "Self"
          ELSE CONCAT(man.first_name," ",man.last_name)
          END
      ;`
      
      connection.query(query, function (err, res) {
          if (err) throw err;
      
          console.table(res);        
          initialList();
  });
}
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});