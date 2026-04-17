import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";
import auditLogService from "../services/auditLogService";

const initialProfile = {
  companyName: localStorage.getItem("companyName") || "KamerWork Hiring",
  logo: "KW",
  location: "Yaoundé, Cameroon",
};

const initialPostings = [
  {
    id: 1,
    title: "Product Designer",
    location: "Yaoundé",
    type: "Full-time",
    deadline: "2026-05-15",
    status: "Active",
    applicants: 12,
  },
  {
    id: 2,
    title: "Frontend Engineer",
    location: "Douala",
    type: "Remote",
    deadline: "2026-04-30",
    status: "Active",
    applicants: 8,
  },
  {
    id: 3,
    title: "HR Business Partner",
    location: "Bafoussam",
    type: "Contract",
    deadline: "2026-03-22",
    status: "Expired",
    applicants: 4,
  },
];

const initialApplicants = [
  {
    id: 101,
    name: "Fiona Etape",
    job: "Product Designer",
    date: "2026-04-08",
    status: "New",
    skills: "Figma, UX Research, Prototyping",
    profile: "Senior Designer with 6 years experience building product flows for fintech and e-commerce.",
    cvLink: "#",
    coverLetter:
      "I am excited to bring my design leadership to KamerWork. I have built interfaces for digital marketplaces and payments platforms.",
  },
  {
    id: 102,
    name: "Jean Claude",
    job: "Frontend Engineer",
    date: "2026-04-07",
    status: "Viewed",
    skills: "React, TypeScript, TailwindCSS",
    profile: "Full-stack frontend engineer with experience in modern React apps and API-driven dashboards.",
    cvLink: "#",
    coverLetter:
      "I’m eager to help your team deliver beautiful hiring experiences through polished interfaces and reliable workflows.",
  },
  {
    id: 103,
    name: "Hanna Mba",
    job: "HR Business Partner",
    date: "2026-04-05",
    status: "Contacted",
    skills: "Talent Acquisition, Employer Branding, Interviewing",
    profile: "HR specialist who has supported hiring for engineering and marketing teams across Africa.",
    cvLink: "#",
    coverLetter:
      "I bring strong employer branding and candidate management practices to help scale your recruitment efforts.",
  },
];

const statusColors = {
  New: "status-pill status-new",
  Viewed: "status-pill status-viewed",
  Contacted: "status-pill status-contacted",
  Rejected: "status-pill status-rejected",
};

const sidebarItems = [
  { title: "Dashboard", subtitle: "Overview", active: true },
  { title: "Jobs", subtitle: "Open positions" },
  { title: "Candidates", subtitle: "Applicant tracking" },
  { title: "Profile", subtitle: "Company details" },
  { title: "Settings", subtitle: "Account settings" },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "Employer";
  const email = localStorage.getItem("email");
  const [jobPostings] = useState(initialPostings);
  const [applicants] = useState(initialApplicants);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Track dashboard access time
  useEffect(() => {
    auditLogService.recordDashboardAccess(email);
    auditLogService.logPageVisit("EMPLOYER_DASHBOARD", {
      email,
      fullName,
      timestamp: new Date().toISOString()
    });

    return () => {
      // Optional: Log when leaving dashboard
      auditLogService.logAction("LEAVE_DASHBOARD", {
        email,
        timestamp: new Date().toISOString()
      });
    };
  }, [email, fullName]);

  const handleLogout = () => {
    auditLogService.logLogout(email);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("sessionId");
    navigate("/login");
  };

  const metrics = useMemo(() => {
    const active = jobPostings.filter((post) => post.status === "Active").length;
    const total = applicants.length;
    const views = 1830 + total * 24;
    const conversion = `${Math.round((total / Math.max(active, 1)) * 8) + 12}%`;
    return { active, total, views, conversion };
  }, [jobPostings, applicants]);

  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchText = `${app.name} ${app.skills} ${app.job}`.toLowerCase();
      const query = search.toLowerCase();
      const statusMatch = filter === "All" || app.status === filter;
      return statusMatch && matchText.includes(query);
    });
  }, [applicants, search, filter]);


  return (
    <div className="employer-dashboard-page">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">KW</div>
            <div>
              <strong>KamerWork</strong>
              <p>Employer portal</p>
            </div>
          </div>

          <div className="sidebar-profile">
            <strong>{fullName}</strong>
            <p>{initialProfile.companyName}</p>
            <span>{initialProfile.location}</span>
          </div>

          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.title}
                type="button"
                className={`sidebar-item${item.active ? " active" : ""}`}>
                <span className="sidebar-item-copy">
                  <span className="sidebar-icon" aria-hidden="true" />
                  <span>{item.title}</span>
                </span>
                <span className="sidebar-dot">›</span>
              </button>
            ))}
          </nav>

          <button className="sidebar-logout" type="button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <section className="dashboard-header">
            <div>
              <p className="label">Employer dashboard</p>
              <h1>Welcome back, {fullName}</h1>
              <p>
                Monitor hiring activity, review incoming applicants, and keep your KamerWork recruitment workflow moving forward.
              </p>
            </div>
            <button className="button-primary" type="button">
              Post new job
            </button>
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
            <article className="overview-card jobs-card">
              <div className="section-title">
                <h2>Job postings</h2>
                <small>Latest open roles</small>
              </div>
              <div className="jobs-list">
                {jobPostings.map((post) => (
                  <div key={post.id} className="job-item">
                    <div>
                      <strong>{post.title}</strong>
                      <p>{post.location} • {post.type}</p>
                    </div>
                    <div className="job-item-meta">
                      <span className={`job-tag ${post.status === "Active" ? "active" : "expired"}`}>
                        {post.status}
                      </span>
                      <p>{post.applicants} applicants</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="overview-card applicants-card">
              <div className="section-title">
                <h2>Recent applicants</h2>
                <small>Review top candidates</small>
              </div>
              <div className="applicant-filter-row">
                <input
                  type="search"
                  placeholder="Search applicants"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="All">All statuses</option>
                  <option value="New">New</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="applicant-row-list">
                {filteredApplicants.slice(0, 5).map((app) => (
                  <button key={app.id} type="button" className="applicant-row">
                    <div>
                      <strong>{app.name}</strong>
                      <p>{app.job}</p>
                    </div>
                    <div className="applicant-row-meta">
                      <span>{app.date}</span>
                      <span className={statusColors[app.status]}>{app.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
