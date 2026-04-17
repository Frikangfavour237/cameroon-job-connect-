import React from "react";

const candidates = [
  { id: 1, name: "Fiona Etape", role: "Product Designer", status: "New" },
  { id: 2, name: "Jean Claude", role: "Frontend Engineer", status: "Viewed" },
  { id: 3, name: "Hanna Mba", role: "HR Business Partner", status: "Contacted" },
];

const EmployerCandidates = () => (
  <section className="overview-card">
    <div className="section-title">
      <h2>Candidates</h2>
      <small>Track applicants and review profiles</small>
    </div>
    <div className="applicant-row-list">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="applicant-row">
          <div>
            <strong>{candidate.name}</strong>
            <p>{candidate.role}</p>
          </div>
          <div className="applicant-row-meta">
            <span className={`status-pill ${candidate.status.toLowerCase()}`}>{candidate.status}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default EmployerCandidates;
