import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employee details");
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-employee-container">
      <h2>Employee Details</h2>
      <p>
        <strong>First Name:</strong> {employee.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {employee.lastName}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Salary:</strong> ${employee.salary}
      </p>
      <Link to="/employees" className="btn btn-primary">
        Back to Employee List
      </Link>
    </div>
  );
};

export default ViewEmployee;
