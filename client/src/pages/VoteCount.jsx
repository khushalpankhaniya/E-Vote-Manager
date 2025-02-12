import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2"; 
import "chart.js/auto"; 
import Navbar from "../componets/Navbar";

const VoteCount = () => {
  const [voteCounts, setVoteCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidate/vote/count");
        setVoteCounts(response.data);
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoteCounts();
  }, []);

  //  Data for Pie Chart
  const chartData = {
    labels: voteCounts.map((party) => party.party),
    datasets: [
      {
        label: "Votes",
        data: voteCounts.map((party) => party.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#BA68C8", "#FFA726"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Heading */}
        <h2 className="text-center text-dark mb-4"> Election Vote Count Dashboard</h2>

        <div className="card shadow p-4 bg-light">
          {loading ? (
            <p className="text-center text-muted fs-5">Loading vote counts...</p>
          ) : (
            <div className="row">
              {/* Table Section - 70% width */}
              <div className="col-md-7">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-bordered text-center">
                    <thead className="table-dark text-white">
                      <tr>
                        <th>Party</th>
                        <th>Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voteCounts.map((partyData, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{partyData.party}</td>
                          <td className="fw-bold text-primary fs-5">{partyData.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart Section - 30% width */}
              <div className="col-md-5 d-flex justify-content-center align-items-center">
                <div style={{ width: "100%", maxWidth: "350px" }}>
                  <Pie data={chartData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VoteCount;
