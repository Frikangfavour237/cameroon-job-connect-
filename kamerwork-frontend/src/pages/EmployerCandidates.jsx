import React from "react";

const candidates = [
  { id: 1, name: "Fiona Etape", role: "Product Designer", status: "New", email: "fiona@example.com" },
  { id: 2, name: "Jean Claude", role: "Frontend Engineer", status: "Viewed", email: "jean@example.com" },
  { id: 3, name: "Hanna Mba", role: "HR Business Partner", status: "Contacted", email: "hanna@example.com" },
];

const EmployerCandidates = () => (
  <section className="candidates-table-card">
    <div className="section-title">
      <h2>Candidates</h2>
      <small>Track applicants and review profiles</small>
    </div>

    <table className="candidates-table">
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Role</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => {
          const avatarClass = index === 0 ? "avatar-green" : index === 1 ? "avatar-teal" : "avatar-amber";
          return (
            <tr key={candidate.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className={`candidate-avatar ${avatarClass}`}>{candidate.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                  <strong>{candidate.name}</strong>
                </div>
              </td>
              <td>{candidate.role}</td>
              <td>{candidate.email}</td>
              <td>
                <span className={`status-pill ${candidate.status.toLowerCase()}`}>{candidate.status}</span>
              </td>
              <td>
                <div className="candidate-actions">
                  <button className="btn-outline-green" type="button">View Profile</button>
                  <button className="btn-outline-blue" type="button">Send Email</button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </section>
);

export default EmployerCandidates;
