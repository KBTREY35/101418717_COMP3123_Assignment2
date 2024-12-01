import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    department: "",
    position: "",
    salary: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(res.data);
      } catch (err) {
        alert("Failed to fetch employee details");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      alert("Failed to update employee!");
    }
  };

  return (
    <div className="update-employee-container">
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
        />
        <div>
          <button type="submit" className="btn btn-primary">
            Update Employee
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/employees")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
