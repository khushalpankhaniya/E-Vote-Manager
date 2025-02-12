import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../componets/Navbar";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = Cookies.get("token"); // Retrieve token from cookies

      try {
        const response = await axios.get("http://localhost:3000/candidate/candidates");

        setCandidates(response.data.candidates); // Assuming API returns candidates in response.data
      } catch (error) {
        console.error("Error fetching candidates:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    const token = Cookies.get("token"); // Retrieve token again

    console.log(candidateId , "-" , token);
    
    try {
      const response = await axios.post(
        `http://localhost:3000/candidate/vote/${candidateId}`,
        {}, // Send an empty body
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      alert(response.data.message || "Vote cast successfully!");
    } catch (error) {
      console.error("Error casting vote:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center py-4">Vote for Your Candidate</h2>

        {loading ? (
          <p className="text-center">Loading candidates...</p>
        ) : (
          <div className="row">
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div key={candidate._id} className="col-md-4">
                  <div className="card mb-3">
                    <div className="card-body text-center">
                      <h5 className="card-title">{candidate.name}</h5>
                      <p className="card-text">Party: {candidate.party}</p>
                      <p className="card-text">Votes: {candidate.voteCount}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleVote(candidate._id)}
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No candidates available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Vote;
