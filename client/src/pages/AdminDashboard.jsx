import React, { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import axios from "axios";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingParty, setEditingParty] = useState(null);
  const [formData, setFormData] = useState({ name: "", party: "" , age: "" });
  const [newCandidate, setNewCandidate] = useState({ name: "", party: "", age: "" }); // For New Candidate

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidate/candidates");
        setCandidates(response.data.candidates);
        console.log(response.data.candidates);
        
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleEditClick = (candidate) => {
    setEditingParty(candidate);
    setFormData({ name: candidate.name, party: candidate.party, age : candidate.age });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartyUpdated = async () => {
    if (!editingParty) return;

    try {
      await axios.put(`http://localhost:3000/candidate/${editingParty._id}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });

      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === editingParty._id ? { ...candidate, ...formData } : candidate
        )
      );
    } catch (error) {
      console.error("Error updating party:", error);
    }
  };


  const handleDeleteCandidate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
  
    try {
      await axios.delete(`http://localhost:3000/candidate/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
  
      // Remove the deleted candidate from the UI
      setCandidates((prev) => prev.filter((candidate) => candidate._id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };
  

  const handleNewCandidateChange = (e) => {
    setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
  };

  const handleAddCandidate = async () => {
    if (!newCandidate.name || !newCandidate.party || !newCandidate.age) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/candidate/", newCandidate, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      
      setCandidates([...candidates, response.data.Candidate]); // Update UI
      setNewCandidate({ name: "", party: "", age: "" }); 

    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  }

    return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Manage Political Parties</h2>
        <div className="row">
          {/* Candidates List */}
          <div className="col-md-8">
            <div className="card shadow p-4">
              <h4 className="mb-3">Existing Parties</h4>
              {loading ? (
                <p className="text-center">Loading candidates...</p>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Party Name</th>
                      <th>Candidate</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.length > 0 ? (
                      candidates.map((candidate, index) => (
                        <tr key={candidate._id}>
                          <td>{index + 1}</td>
                          <td>{candidate.party}</td>
                          <td>{candidate.name}</td>
                          <td>{candidate.age}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm mx-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleEditClick(candidate)} >
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm"  onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No candidates available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Add Candidate Form */}
          <div className="col-md-4">
            <div className="card shadow p-4">
              <h4>Add New Candidate</h4>
              <div className="form-group mt-3">
                <label>Candidate Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newCandidate.name}
                  onChange={handleNewCandidateChange}
                  placeholder="Enter candidate name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Party Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="party"
                  value={newCandidate.party}
                  onChange={handleNewCandidateChange}
                  placeholder="Enter party name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={newCandidate.age}
                  onChange={handleNewCandidateChange}
                  placeholder="Enter candidate age"
                />
              </div>
              <button className="btn btn-primary mt-3 w-100" onClick={handleAddCandidate}>Add Candidate</button>
            </div>
          </div>
        </div>

        {/* Edit Party Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Party</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group mt-3">
                  <label>Party Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="party"
                    value={formData.party}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Candidate Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Candidate Age</label>
                  <input
                    type="text"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePartyUpdated}
                  data-bs-dismiss="modal"
                >
                  Update Party
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
