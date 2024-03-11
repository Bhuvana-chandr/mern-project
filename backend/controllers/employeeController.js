// backend/controllers/employeeController.js

const Employee = require('../models/Employee');

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    // Create a new employee instance
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      createdDate: new Date(),
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all employees
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an employee by ID
const updateEmployeeById = async (req, res) => {
  try {
    // Find the employee by ID and update its fields
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
      },
      { new: true }
    );

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an employee by ID
const deleteEmployeeById = async (req, res) => {
  try {
    // Find the employee by ID and delete it
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createEmployee, getAllEmployees, updateEmployeeById, deleteEmployeeById };
