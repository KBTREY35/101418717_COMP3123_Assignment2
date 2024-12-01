import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${BASE_URL}/api/users/signup`, { name, email, password });
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert(`Signup failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <button type="submit" className="btn-primary">Signup</button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
            Already Have an Account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
