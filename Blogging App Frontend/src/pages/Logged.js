// Updated code with navbar, hover effect, and clickable blogs
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// Configure Axios interceptor
if (!axios.defaults.headers.common["Authorization"]) {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    alert("JWT token is empty");
  }
}

export default function Logged() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    blogId: "",
    blogTitle: "",
    blogContent: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      getAllBlog();
    } else {
      alert("User ID not found. Please log in again.");
    }
  }, []);

  // Fetch all blogs
  const getAllBlog = async () => {
    try {
      const response = await axios.get("http://localhost:8080/blog/all", {
        params: { userId },
      });
      setBlogs(response.data);
    } catch (error) {
      alert("Error fetching blogs.");
      console.error(error);
    }
  };

  // Open blog form
  const openBlogForm = () => {
    navigate("/Blog");
  };

  // Delete blog
  const deleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8080/blog/delete/${blogId}`);
        alert("Blog deleted successfully!");
        getAllBlog();
      } catch (error) {
        alert("Failed to delete blog.");
        console.error(error);
      }
    }
  };

  // Open edit form
  const openEditForm = (blog) => {
    setEditMode(true);
    setCurrentBlog({
      blogId: blog.blogid,
      blogTitle: blog.blogTitle,
      blogContent: blog.blogContent,
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { blogId, blogTitle, blogContent } = currentBlog;
      const response = await axios.put(`http://localhost:8080/blog/update/${blogId}`, {
        blogTitle,
        blogContent,
      });
      if (response.status === 200) {
        alert("Blog updated successfully!");
        setEditMode(false);
        getAllBlog();
      }
    } catch (error) {
      alert("Failed to update blog.");
      console.error(error);
    }
  };

  // Show blog details
  const showBlogDetails = (blog) => {
    setCurrentBlog(blog);
    setShowBlog(true);
  };

  // Close blog details
  const closeBlog = () => {
    setShowBlog(false);
    setCurrentBlog({ blogId: "", blogTitle: "", blogContent: "" });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
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
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <button className="btn btn-success mb-4 mt-3" onClick={openBlogForm}>
        ➕ Add New Blog
      </button>

      {/* Show Blog Details */}
      {showBlog && (
        <div className="card p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-3">{currentBlog.blogTitle}</h4>
            <FaTimes
              className="text-danger fs-4"
              style={{ cursor: "pointer" }}
              onClick={closeBlog}
            />
          </div>
          <p>{currentBlog.blogContent}</p>
        </div>
      )}

      {/* Edit Blog Form */}
      {editMode && (
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Edit Blog</h4>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Blog Title</label>
              <input
                type="text"
                className="form-control"
                value={currentBlog.blogTitle}
                onChange={(e) => setCurrentBlog({ ...currentBlog, blogTitle: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Blog Content</label>
              <textarea
                className="form-control"
                rows="4"
                value={currentBlog.blogContent}
                onChange={(e) => setCurrentBlog({ ...currentBlog, blogContent: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}

      {/* Display Blogs */}
      <div className="row justify-content-center">
        {blogs.length === 0 ? (
          <div className="text-center text-muted">No blogs available</div>
        ) : (
          blogs.map((blog, index) => (
            <div key={blog.blogid || index} className="col-md-6 mb-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)")}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = "")}
                onClick={() => showBlogDetails(blog)}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{blog.blogTitle || "Untitled Blog"}</h5>
                  <p className="card-text text-secondary">
                    {blog.blogContent ? blog.blogContent.substring(0, 100) + "..." : "No content available"}
                  </p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning me-2" onClick={(e) => {
                      e.stopPropagation();
                      openEditForm(blog);
                    }}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger" onClick={(e) => {
                      e.stopPropagation();
                      deleteBlog(blog.blogid);
                    }}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}