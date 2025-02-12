import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await axios.put("http://localhost:3000/user/profile/password",formData,{
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },}
      );
  
      setMessage(response.data.message || "Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" }); 
    } catch (error) {
      console.log("Error:", error);
      setMessage(error.response?.data?.message || "Failed to change password.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Change Password</h3>

        {message && <div className="alert alert-danger text-center">{message}</div>}

        <form onSubmit={handleChangePassword}>

          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>


          <button type="submit" className="btn btn-primary w-100">
            Change Password
          </button>

          <div className="text-center mt-3">
            <p>
              Back to <Link to="/profile">Profile</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
