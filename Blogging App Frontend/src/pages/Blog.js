import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Configure Axios to include the token from localStorage automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Correct token key
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function Blog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Correctly retrieve userId

    if (!token) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/blog/save",
        { blogTitle, blogContent, userId }, // Correctly include userId
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Blog Saved Successfully");
        navigate("/logged");
      } else {
        alert("Failed to save blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error saving blog: ${error.response?.status || error.message}`);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">📝 BlogApp</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Blog Form */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 text-primary">Create a Blog</h2>
            <form onSubmit={handleSubmit}>
              {/* Blog Title Input */}
              <div className="mb-3">
                <label className="form-label">Enter Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                />
              </div>

              {/* Blog Content Input */}
              <div className="mb-3">
                <label className="form-label">Write Blog Here</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your blog..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Save Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
