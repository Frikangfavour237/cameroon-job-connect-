import React from "react";

const messages = [
  { id: 1, from: "Fiona Etape", subject: "Application for Product Designer", date: "Apr 12" },
  { id: 2, from: "Jean Claude", subject: "Question about Frontend Engineer role", date: "Apr 10" },
  { id: 3, from: "Hanna Mba", subject: "Availability for HR Business Partner interview", date: "Apr 08" },
];

const EmployerInbox = () => (
  <section className="overview-card">
    <div className="section-title">
      <h2>Inbox</h2>
      <small>Messages from candidates and updates</small>
    </div>
    <div className="jobs-list">
      {messages.map((message) => (
        <div key={message.id} className="job-item">
          <div>
            <strong>{message.from}</strong>
            <p>{message.subject}</p>
          </div>
          <div className="job-item-meta">
            <span>{message.date}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default EmployerInbox;
