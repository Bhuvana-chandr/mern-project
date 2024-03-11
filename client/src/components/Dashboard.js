// client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployeeList(response.data);
    } catch (error) {
      console.error(error.response.data); // Handle error
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>designation</th>
            <th>gender</th>
            <th>course</th>
            <th>img</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              {/* Add more table data for other employee fields */}
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{employee.img}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
