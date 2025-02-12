import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        aadharCardNumber: aadhar,
        password,
      });

      console.log("Login Successful:", response.data);

      // Example: Store token if provided
      if (response.data.token) {
        Cookies.set("token", response.data.token , { expires: 1 / 24 });
         navigate("/profile");
         window.location.reload();
      }

    } catch (error) {
      console.log("Login Failed:", error.response.data.message);
      setError(error.response.data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="aadhar" className="form-label">
              Aadhar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
