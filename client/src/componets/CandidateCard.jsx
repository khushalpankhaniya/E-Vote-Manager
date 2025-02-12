const CandidateCard = () => {
  return (
    <div className="card p-3 shadow-sm">
      <h3>Candidate Name</h3>
      <p><strong>Role:</strong> Position Name</p>
      <p><strong>Votes:</strong> 100</p>

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary">Vote</button>
        <button className="btn btn-warning">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default CandidateCard;
