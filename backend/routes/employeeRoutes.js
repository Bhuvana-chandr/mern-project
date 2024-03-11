// backend/routes/employeeRoutes.js
const router = require('express').Router();
let Employee = require('../models/Employee');

router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const designation = req.body.designation;
  const gender = req.body.gender;
  const course = req.body.course;

  const newEmployee = new Employee({name, email, mobile, designation, gender, course});

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
