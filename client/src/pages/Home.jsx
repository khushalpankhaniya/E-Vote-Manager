import React from "react";
import Navbar from "../componets/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
        style={{
          background: "linear-gradient(to right, #007bff, #6610f2)",
          color: "white",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to E-Vote Manager</h1>
          <p className="lead mt-3">
            A secure and transparent online voting system for fair elections.
          </p>
          {/* <div className="mt-4">
              <a href="/vote" className="btn btn-light btn-lg px-5 py-3 fw-bold">
                Cast Your Vote
              </a>
            </div> */}
        </div>

        <div className="container mt-5">
          <div className="row text-dark bg-light p-5 rounded shadow">
            <div className="col-md-4 text-center">
              <h3 className="fw-bold">🔒 Secure Voting</h3>
              <p>End-to-end encryption ensures your vote is safe.</p>
            </div>
            <div className="col-md-4 text-center">
              <h3 className="fw-bold">📊 Transparent Process</h3>
              <p>Every vote is accounted for with complete transparency.</p>
            </div>
            <div className="col-md-4 text-center">
              <h3 className="fw-bold">⚡ Fast & Easy</h3>
              <p>Vote in just a few clicks from anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
