import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  // ✅ Fix: Import Logged
import Login from "./pages/Login";    // ✅ Ensure this file exists
import Signup from "./pages/Signup"; 
import Logged from "./pages/Logged";
import Blog from './pages/Blog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* ✅ Ensure this route points to Logged */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logged" element={<Logged />} />
      <Route path="/Blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
