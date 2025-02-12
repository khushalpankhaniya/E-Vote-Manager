import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Signup = () => {

  const [SignInfo, setSignInfo] = useState({
    name: "",
    email: "",
    mobileno: "",
    aadharCardNumber: "",
    address: "",
    age: "",
    password: "",
    role: "voter",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSignInfo({ ...SignInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing up...");

    console.log(SignInfo);

    try {
      const response = await axios.post("http://localhost:3000/user/signup", SignInfo, {
        headers: { "Content-Type": "application/json" },
      });

      // console.log(response.data);

      if (response.data.success) {
        setMessage("Signup successful! You can now log in.");
        Cookies.set('token' , response.data.token , { expires: 1 / 24 })
        console.log(response.data.token);
        
      } else {
        setMessage(response.data.message || "Signup failed. Try again.");
        console.log( response);   
      }
    } catch (error) {
      setMessage(error.response.data.message || "Signup failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">Signup</h3>
        {message && <p className="alert alert-danger text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={SignInfo.name} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={SignInfo.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input type="number" className="form-control" name="mobileno" value={SignInfo.mobileno} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Aadhar Number</label>
              <input type="text" className="form-control" name="aadharCardNumber" value={SignInfo.aadharCardNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" name="address" value={SignInfo.address} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" name="age" value={SignInfo.age} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={SignInfo.password} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Select Role</label>
              <select className="form-select" name="role" value={SignInfo.role} onChange={handleChange}>
                <option value="voter">Voter</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Signup</button>

          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
