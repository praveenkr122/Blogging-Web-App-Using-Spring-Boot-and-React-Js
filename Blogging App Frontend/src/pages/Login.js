import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);

      // Destructure response data
      const { token, userId } = response.data;

      // Store token and userId in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      alert("Login successful!");
      navigate("/logged");
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        const { status, data } = error.response;
        const message = data.message || "An error occurred. Please try again.";
        if (status === 401) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert(message);
        }
      } else {
        alert("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
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

      {/* Login Page */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4 text-primary">Login</h2>

          <form onSubmit={handleSubmit} className="card p-4 shadow-lg rounded">
            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Redirect */}
          <div className="mt-3 text-center">
            <span className="d-block mb-2">New here? Create an account!</span>
            <Link to="/signup" className="btn btn-outline-secondary">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
