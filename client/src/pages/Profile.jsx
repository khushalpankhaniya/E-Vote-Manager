import React, { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f8f9fa" }}>
        <div className="card shadow-lg p-4 rounded" style={{ width: "420px", borderRadius: "12px", background: "#fff" }}>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#333" }}>User Profile</h2>

          {user ? (
            <div className="mb-4">
              <div className="p-3 bg-light rounded mb-3">
                <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Mobile:</strong> {user.mobileno}</p>
                <p className="mb-2"><strong>Aadhar:</strong> {user.aadharCardNumber}</p>
                <p className="mb-2"><strong>Role:</strong> {user.role}</p>
                <p className="mb-0"><strong>Voted:</strong> <span className={`fw-bold ${user.isVoted ? "text-success" : "text-danger"}`}>{user.isVoted ? "Yes" : "No"}</span></p>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
