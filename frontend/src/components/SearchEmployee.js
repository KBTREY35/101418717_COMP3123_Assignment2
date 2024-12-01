import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchEmployee = () => {
  const [query, setQuery] = useState({ department: "", position: "" });
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setEmployees([]); 
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/employees/search`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            department: query.department,
            position: query.position,
          },
        }
      );

      if (res.data.length === 0) {
        const allEmployeesRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employees`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allEmployees = allEmployeesRes.data;

        const matchesDepartment = allEmployees.filter(
          (employee) =>
            employee.department.toLowerCase() === query.department.toLowerCase()
        );

        if (matchesDepartment.length > 0) {
          setErrorMessage(
            `No employees found in the position '${query.position}' within the '${query.department}' department.`
          );
        } else {
          setErrorMessage(
            `No employees found in the '${query.department}' department or position '${query.position}'.`
          );
        }
      } else {
        setEmployees(res.data);
      }
    } catch (err) {
      alert("Search failed!");
    }
  };

  return (
    <div className="search-employee-container">
      <h2>Search Employees</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={query.department}
          onChange={(e) =>
            setQuery({ ...query, department: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={query.position}
          onChange={(e) => setQuery({ ...query, position: e.target.value })}
        />
        <div className="button-group">
          <button type="submit" className="btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Back
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {employees.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchEmployee;
