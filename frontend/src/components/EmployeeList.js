import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employees`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Employee deleted successfully!");
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (err) {
        alert("Failed to delete employee!");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="employee-list-container">
      <div className="header">
        <h1>Employee Management App</h1>
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="employee-actions">
        <button className="btn-primary" onClick={() => navigate("/add-employee")}>
          Add Employee
        </button>
        <button className="btn-info" onClick={() => navigate("/search")}>
          Search Employee
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn-warning"
                  onClick={() => navigate(`/update-employee/${employee._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <button
                  className="btn-info"
                  onClick={() => navigate(`/view-employee/${employee._id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
