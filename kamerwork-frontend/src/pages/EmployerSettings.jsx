import React from "react";

const EmployerSettings = () => (
  <section className="overview-card">
    <div className="section-title">
      <h2>Settings</h2>
      <small>Manage your account preferences</small>
    </div>
    <div className="detail-box">
      <h4>Notifications</h4>
      <p>Enable email alerts for new applications and candidate messages.</p>
      <h4>Privacy</h4>
      <p>Update your data sharing and profile visibility settings here.</p>
      <h4>Security</h4>
      <p>Change your password, enable 2FA, and review active sessions.</p>
    </div>
  </section>
);

export default EmployerSettings;
