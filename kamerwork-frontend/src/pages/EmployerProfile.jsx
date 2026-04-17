import React from "react";

const EmployerProfile = () => {
  const companyName = localStorage.getItem("companyName") || "KamerWork Hiring";
  const location = "Yaoundé, Cameroon";
  const description = "KamerWork Hiring is focused on matching local talent with high-impact jobs across Cameroon. We help employers hire faster with a strong candidate pipeline.";
  return (
    <section className="overview-card">
      <div className="section-title">
        <h2>Company profile</h2>
        <small>Update your employer details</small>
      </div>
      <div className="detail-box">
        <h4>Company</h4>
        <p>{companyName}</p>
        <h4>Location</h4>
        <p>{location}</p>
        <h4>About</h4>
        <p>{description}</p>
        <h4>Website</h4>
        <p>www.kamerwork.cm</p>
      </div>
    </section>
  );
};

export default EmployerProfile;
