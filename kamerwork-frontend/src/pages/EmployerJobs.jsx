import React from "react";

const jobList = [
  { id: 1, title: "Product Designer", company: "KamerWork", type: "Full-time", location: "Yaoundé", status: "Active" },
  { id: 2, title: "Frontend Engineer", company: "ByteStream", type: "Remote", location: "Douala", status: "Active" },
  { id: 3, title: "HR Business Partner", company: "CamTalent", type: "Contract", location: "Bafoussam", status: "Expired" },
];

const EmployerJobs = () => (
  <section className="overview-card">
    <div className="section-title">
      <h2>Open jobs</h2>
      <small>Manage and update all active listings</small>
    </div>
    <div className="jobs-list">
      {jobList.map((job) => (
        <div key={job.id} className="job-item">
          <div>
            <strong>{job.title}</strong>
            <p>{job.company} · {job.location}</p>
          </div>
          <div className="job-item-meta">
            <span>{job.type}</span>
            <span className={`job-tag ${job.status === "Active" ? "active" : "expired"}`}>{job.status}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default EmployerJobs;
