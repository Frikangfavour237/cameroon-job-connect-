import React, { useEffect, useMemo } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";
import auditLogService from "../services/auditLogService";

const DashboardIcon = ({ children, className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const IconDashboard = (props) => (
  <DashboardIcon {...props}>
    <path d="M4 11.5L12 5l8 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 10.8V19h4.8v-4.6h1.4V19h4.8v-8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </DashboardIcon>
);

const IconBriefcase = (props) => (
  <DashboardIcon {...props}>
    <rect x="4.5" y="7.5" width="15" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 7.5V6.3A1.8 1.8 0 0 1 10.8 4.5h2.4A1.8 1.8 0 0 1 15 6.3v1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4.5 12h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </DashboardIcon>
);

const IconUsers = (props) => (
  <DashboardIcon {...props}>
    <path d="M8.2 11.2a2.7 2.7 0 1 0-2.7-2.7 2.7 2.7 0 0 0 2.7 2.7Zm7.6 0a2.7 2.7 0 1 0-2.7-2.7 2.7 2.7 0 0 0 2.7 2.7Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M4.8 18.5c.7-2.6 2.4-4 3.9-4s3.1 1.4 3.9 4M12.5 18.5c.5-1.9 1.8-3 3-3 1.3 0 2.6 1.1 3.1 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </DashboardIcon>
);

const IconEye = (props) => (
  <DashboardIcon {...props}>
    <path d="M2.8 12s2.9-5.2 9.2-5.2S21.2 12 21.2 12s-2.9 5.2-9.2 5.2S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
  </DashboardIcon>
);

const IconChart = (props) => (
  <DashboardIcon {...props}>
    <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="6" y="11.5" width="2.8" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="10.6" y="8.5" width="2.8" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="15.2" y="5.5" width="2.8" height="13" rx="1" stroke="currentColor" strokeWidth="1.6" />
  </DashboardIcon>
);

const IconInbox = (props) => (
  <DashboardIcon {...props}>
    <path d="M4.5 7.5h15v9h-4.2l-1.3 2h-4l-1.3-2H4.5v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8 11h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </DashboardIcon>
);

const IconProfile = (props) => (
  <DashboardIcon {...props}>
    <path d="M12 12.5a3.4 3.4 0 1 0-3.4-3.4A3.4 3.4 0 0 0 12 12.5Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5.6 19c1.2-3 3.3-4.5 6.4-4.5S17.2 16 18.4 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </DashboardIcon>
);

const IconSettings = (props) => (
  <DashboardIcon {...props}>
    <path d="M12 8.2a3.8 3.8 0 1 0 3.8 3.8A3.8 3.8 0 0 0 12 8.2Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 4.8v2M12 17.2v2M6.9 6.9l1.4 1.4M15.7 15.7l1.4 1.4M4.8 12h2M17.2 12h2M6.9 17.1l1.4-1.4M15.7 8.3l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </DashboardIcon>
);

const IconSearch = (props) => (
  <DashboardIcon {...props}>
    <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </DashboardIcon>
);

const IconBell = (props) => (
  <DashboardIcon {...props}>
    <path d="M12 4.8a4.4 4.4 0 0 0-4.4 4.4v2.4c0 .8-.2 1.5-.6 2.2L6 15h12l-.9-1.2c-.4-.6-.6-1.4-.6-2.2V9.2A4.4 4.4 0 0 0 12 4.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </DashboardIcon>
);

const initialProfile = {
  companyName: localStorage.getItem("companyName") || "KamerWork Hiring",
  location: "Yaoundé, Cameroon",
};

const sidebarItems = [
  { title: "Dashboard", subtitle: "Overview", icon: IconDashboard, to: "/employer-dashboard", end: true },
  { title: "Jobs", subtitle: "Open positions", icon: IconBriefcase, to: "/employer-dashboard/jobs" },
  { title: "Candidates", subtitle: "Applicant tracking", icon: IconUsers, to: "/employer-dashboard/candidates" },
  { title: "Inbox", subtitle: "Messages", icon: IconInbox, to: "/employer-dashboard/inbox" },
  { title: "Profile", subtitle: "Company details", icon: IconProfile, to: "/employer-dashboard/profile" },
  { title: "Settings", subtitle: "Account settings", icon: IconSettings, to: "/employer-dashboard/settings" },
];

const EmployerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "Employer";
  const email = localStorage.getItem("email");
  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "KW";
  }, [fullName]);

  const pageTitle = useMemo(() => {
    const routeMap = {
      "/employer-dashboard": "Dashboard",
      "/employer-dashboard/jobs": "Jobs",
      "/employer-dashboard/candidates": "Candidates",
      "/employer-dashboard/inbox": "Inbox",
      "/employer-dashboard/profile": "Profile",
      "/employer-dashboard/settings": "Settings",
    };

    return routeMap[location.pathname] || "Dashboard";
  }, [location.pathname]);

  useEffect(() => {
    auditLogService.recordDashboardAccess(email);
    auditLogService.logPageVisit("EMPLOYER_DASHBOARD", {
      email,
      fullName,
      timestamp: new Date().toISOString(),
    });

    return () => {
      auditLogService.logAction("LEAVE_DASHBOARD", {
        email,
        timestamp: new Date().toISOString(),
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

          <div className="sidebar-profile-card">
            <div className="sidebar-profile">
              <div className="sidebar-profile-avatar">{initials}</div>
              <div>
                <strong>{fullName}</strong>
                <p>{initialProfile.companyName}</p>
                <span>{initialProfile.location}</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Employer dashboard navigation">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar-item${isActive ? " active" : ""}`}
              >
                <span className="sidebar-item-copy">
                  <span className="sidebar-icon" aria-hidden="true"><item.icon className="sidebar-icon-svg" /></span>
                  <span className="sidebar-item-text">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </span>
                <span className="sidebar-dot">›</span>
              </NavLink>
            ))}
          </nav>

          <button className="sidebar-logout" type="button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-topbar">
            <div>
              <p className="topbar-kicker">Employer dashboard</p>
              <h1>{pageTitle}</h1>
            </div>

            <div className="dashboard-topbar-actions">
              <label className="topbar-search">
                <IconSearch className="topbar-search-icon" />
                <input type="search" placeholder="Search dashboard" aria-label="Search dashboard" />
              </label>

              <button className="topbar-icon-button" type="button" aria-label="Notifications">
                <IconBell className="topbar-bell-icon" />
                <span className="topbar-notification-dot" aria-hidden="true" />
              </button>

              <button className="button-primary topbar-post-button" type="button">
                + Post New Job
              </button>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
