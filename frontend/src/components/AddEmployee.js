import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/employees`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (err) {
      alert("Failed to add employee!");
    }
  };

  return (
    <div className="add-employee-container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={employee.department}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
        />
        <div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/employees")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
