import React, { useMemo, useState } from "react";

const TileIcon = ({ children }) => (
  <span className="metric-card-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      {children}
    </svg>
  </span>
);

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
      </section>

      <section className="dashboard-metrics">
        <article className="metric-card metric-card--jobs">
          <TileIcon>
            <path d="M4.5 7.5h15v11h-15z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 7.5V6.3A1.8 1.8 0 0 1 10.8 4.5h2.4A1.8 1.8 0 0 1 15 6.3v1.2" stroke="currentColor" strokeWidth="1.6" />
          </TileIcon>
          <span>Active jobs</span>
          <strong>{metrics.active}</strong>
          <small>Live positions on KamerWork</small>
        </article>
        <article className="metric-card metric-card--applicants">
          <TileIcon>
            <path d="M8.2 11.2a2.7 2.7 0 1 0-2.7-2.7 2.7 2.7 0 0 0 2.7 2.7Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4.8 18.2c.8-2.6 2.4-4 3.9-4 1.5 0 3.1 1.4 3.9 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M15.8 11.2a2.7 2.7 0 1 0-2.7-2.7 2.7 2.7 0 0 0 2.7 2.7Z" stroke="currentColor" strokeWidth="1.6" />
          </TileIcon>
          <span>Total applicants</span>
          <strong>{metrics.total}</strong>
          <small>Candidates in your pipeline</small>
        </article>
        <article className="metric-card metric-card--views">
          <TileIcon>
            <path d="M2.8 12s2.9-5.2 9.2-5.2S21.2 12 21.2 12s-2.9 5.2-9.2 5.2S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.6" />
          </TileIcon>
          <span>Total views</span>
          <strong>{metrics.views}</strong>
          <small>Job and company page views</small>
        </article>
        <article className="metric-card metric-card--conversion">
          <TileIcon>
            <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="6" y="11.5" width="2.8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10.6" y="8.5" width="2.8" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="15.2" y="5.5" width="2.8" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </TileIcon>
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
            <h2>Recent applicants</h2>
            <small>Review top candidates</small>
          </div>
          <div className="applicant-filter-row">
            <input type="search" placeholder="Search applicants" aria-label="Search applicants" />
            <select aria-label="Filter applicants">
              <option>All statuses</option>
              <option>New</option>
              <option>Viewed</option>
              <option>Contacted</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="applicant-row-list">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="applicant-row">
                <div className="applicant-row-left">
                  <div className={`applicant-avatar ${applicant.status === "New" ? "avatar-green" : applicant.status === "Viewed" ? "avatar-teal" : "avatar-amber"}`}>
                    {applicant.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <strong>{applicant.name}</strong>
                    <p>{applicant.job}</p>
                  </div>
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
