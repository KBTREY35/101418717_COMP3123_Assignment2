import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/employees");
    } catch (err) {
      alert(`Login failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-group">
          <button type="submit" className="btn-primary">Login</button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/signup")}>
            Don't Have an Account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
