import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditEmployee({ match }) {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${match.params.id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchEmployee();
  }, [match.params.id]);

  const handleChange = e => {
    if (e.target.name === 'image') {
      setEmployee({ ...employee, [e.target.name]: e.target.files[0] });
    } else {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const putData = new FormData();
      for (const key in employee) {
        putData.append(key, employee[key]);
      }
      await axios.put(`/api/employees/${match.params.id}`, putData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee updated successfully');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={employee.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={employee.course}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;
