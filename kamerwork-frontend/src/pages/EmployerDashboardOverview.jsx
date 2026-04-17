import React, { useMemo, useState } from "react";

const initialPostings = [
  { id: 1, title: "Product Designer", location: "Yaoundé", type: "Full-time", deadline: "2026-05-15", status: "Active", applicants: 12 },
  { id: 2, title: "Frontend Engineer", location: "Douala", type: "Remote", deadline: "2026-04-30", status: "Active", applicants: 8 },
  { id: 3, title: "HR Business Partner", location: "Bafoussam", type: "Contract", deadline: "2026-03-22", status: "Expired", applicants: 4 },
];

const initialApplicants = [
  { id: 101, name: "Fiona Etape", job: "Product Designer", date: "2026-04-08", status: "New" },
  { id: 102, name: "Jean Claude", job: "Frontend Engineer", date: "2026-04-07", status: "Viewed" },
  { id: 103, name: "Hanna Mba", job: "HR Business Partner", date: "2026-04-05", status: "Contacted" },
];

const EmployerDashboardOverview = () => {
  const fullName = localStorage.getItem("fullName") || "Employer";
  const [jobPostings] = useState(initialPostings);
  const [applicants] = useState(initialApplicants);

  const metrics = useMemo(() => {
    const active = jobPostings.filter((post) => post.status === "Active").length;
    const total = applicants.length;
    return {
      active,
      total,
      views: 1830 + total * 24,
      conversion: `${Math.round((total / Math.max(active, 1)) * 8) + 12}%`,
    };
  }, [jobPostings, applicants]);

  return (
    <>
      <section className="dashboard-header">
        <div>
          <p className="label">Employer dashboard</p>
          <h1>Welcome back, {fullName}</h1>
          <p>Monitor hiring activity, review incoming applicants, and keep your KamerWork recruitment workflow moving forward.</p>
        </div>
        <button className="button-primary" type="button">Post new job</button>
      </section>

      <section className="dashboard-metrics">
        <article className="metric-card">
          <span>Active jobs</span>
          <strong>{metrics.active}</strong>
          <small>Live positions on KamerWork</small>
        </article>
        <article className="metric-card">
          <span>Total applicants</span>
          <strong>{metrics.total}</strong>
          <small>Candidates in your pipeline</small>
        </article>
        <article className="metric-card">
          <span>Total views</span>
          <strong>{metrics.views}</strong>
          <small>Job and company page views</small>
        </article>
        <article className="metric-card">
          <span>Conversion rate</span>
          <strong>{metrics.conversion}</strong>
          <small>Applications per active role</small>
        </article>
      </section>

      <section className="dashboard-charts">
        <article className="chart-card">
          <div className="chart-head">
            <div>
              <h2>Job views</h2>
              <small>Past 30 days</small>
            </div>
            <span className="chart-tag">+14%</span>
          </div>
          <div className="chart-visual chart-bars">
            {[30, 45, 36, 58, 42, 54, 68, 52].map((value, index) => (
              <span key={index} className="chart-bar" style={{ height: `${value}%` }} />
            ))}
          </div>
          <div className="chart-footer">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </article>

        <article className="chart-card">
          <div className="chart-head">
            <div>
              <h2>Applications received</h2>
              <small>Past 30 days</small>
            </div>
            <span className="chart-tag">+9%</span>
          </div>
          <div className="chart-visual chart-line">
            <span className="line-point p1" />
            <span className="line-point p2" />
            <span className="line-point p3" />
            <span className="line-point p4" />
            <span className="line-point p5" />
          </div>
          <div className="chart-footer">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </article>
      </section>

      <section className="dashboard-overview">
        <article className="overview-card">
          <div className="section-title">
            <h2>Job postings</h2>
            <small>Latest open roles</small>
          </div>
          <div className="jobs-list">
            {jobPostings.map((post) => (
              <div key={post.id} className="job-item">
                <div>
                  <strong>{post.title}</strong>
                  <p>{post.location} · {post.type}</p>
                </div>
                <div className="job-item-meta">
                  <span className={`job-tag ${post.status === "Active" ? "active" : "expired"}`}>{post.status}</span>
                  <span>{post.applicants} applicants</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="overview-card">
          <div className="section-title">
            <h2>Top applicants</h2>
            <small>Recent candidate activity</small>
          </div>
          <div className="applicant-row-list">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="applicant-row">
                <div>
                  <strong>{applicant.name}</strong>
                  <p>{applicant.job}</p>
                </div>
                <div className="applicant-row-meta">
                  <span>{applicant.date}</span>
                  <span className={`status-pill ${applicant.status.toLowerCase()}`}>{applicant.status}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export default EmployerDashboardOverview;
