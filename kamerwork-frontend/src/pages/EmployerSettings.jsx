import React from "react";

const settings = [
  {
    title: "Notifications",
    description: "Enable email alerts for new applications and candidate messages.",
  },
  {
    title: "Privacy",
    description: "Update your data sharing and profile visibility settings here.",
  },
  {
    title: "Security",
    description: "Change your password, enable 2FA, and review active sessions.",
  },
];

const EmployerSettings = () => (
  <section className="overview-card settings-card">
    <div className="section-title">
      <h2>Settings</h2>
      <small>Manage your account preferences</small>
    </div>
    <div className="settings-list">
      {settings.map((setting) => (
        <div key={setting.title} className="setting-row">
          <div>
            <strong>{setting.title}</strong>
            <div className="setting-description">{setting.description}</div>
          </div>
          <span className="setting-chevron">›</span>
        </div>
      ))}
    </div>
  </section>
);

export default EmployerSettings;
