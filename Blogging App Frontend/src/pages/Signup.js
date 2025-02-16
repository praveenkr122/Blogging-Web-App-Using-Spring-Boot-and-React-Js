import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/signup", { email, password });
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">📝 BlogApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Signup Page */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4 text-success">Sign Up</h2>

          <form onSubmit={handleSubmit} className="card p-4 shadow-lg rounded">
            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-3 text-center">
            <span className="d-block mb-2">Already have an account?</span>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;