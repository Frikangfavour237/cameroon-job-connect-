// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const jobs = [
    { company: "MTN Cameroon", title: "Senior Software Developer", location: "Yaoundé", type: "Full-time", salary: "1,500,000 - 2,500,000 FCFA", days: "2 days ago" },
    { company: "Société Générale", title: "Financial Analyst", location: "Douala", type: "Full-time", salary: "1,200,000 - 1,800,000 FCFA", days: "1 week ago" },
    { company: "Orange Cameroon", title: "Digital Marketing Manager", location: "Yaoundé", type: "Full-time", salary: "1,800,000 - 2,500,000 FCFA", days: "3 days ago" },
    { company: "ENEO Cameroon", title: "Electrical Engineer", location: "Douala", type: "Full-time", salary: "1,400,000 - 2,000,000 FCFA", days: "3 days ago" },
  ];

  const featured = [
    "MTN Cameroon", "Orange Cameroon", "ENEO Cameroon", "Société Générale", "Total Energies", "BICEC", "Nestlé Cameroon", "Alucam"
  ];

  return (
    <div className="landing">
      <nav className="hero-nav">
        <div className="brand">KarmerWork</div>
        <div className="hero-links">
          <a href="#jobs">Find Jobs</a>
          <a href="#companies">Companies</a>
          <a href="#about">About</a>
        </div>
        <div className="hero-action">
          <button className="ghost">For Employers</button>
          <Link to="/login"><button className="primary">Sign In</button></Link>
        </div>
      </nav>

      <header className="hero-banner" id="jobs">
        <h1>Find Your Dream Job in Cameroon</h1>
        <p>Connect with top employers across the country</p>
        <div className="search-row">
          <input type="text" placeholder="Job title, keywords, or company" />
          <input type="text" placeholder="City or region" />
          <button>Search Jobs</button>
        </div>
        <div className="popular">Popular: Software Developer · Accountant · Sales Manager · Teacher</div>
      </header>

      <section className="stats-row">
        <div>
          <h2>580+</h2>
          <p>Companies Hiring</p>
        </div>
        <div>
          <h2>12,400+</h2>
          <p>Registered Job Seekers</p>
        </div>
        <div>
          <h2>10</h2>
          <p>Regions Covered</p>
        </div>
      </section>

      <main className="jobs-area">
        <aside className="filters-panel">
          <div className="filter-header">Filters <span>Clear All</span></div>
          <div className="filter-group"><strong>LOCATION</strong>
            <label><input type="checkbox" /> Yaoundé</label>
            <label><input type="checkbox" /> Douala</label>
            <label><input type="checkbox" /> Bafoussam</label>
            <label><input type="checkbox" /> Garoua</label>
            <label><input type="checkbox" /> Bamenda</label>
            <label><input type="checkbox" /> Maroua</label>
            <label><input type="checkbox" /> Ngaoundéré</label>
          </div>
          <div className="filter-group"><strong>CATEGORY</strong>
            <label><input type="checkbox" /> Information Technology</label>
            <label><input type="checkbox" /> Finance & Accounting</label>
            <label><input type="checkbox" /> Healthcare</label>
            <label><input type="checkbox" /> Education</label>
            <label><input type="checkbox" /> Sales & Marketing</label>
            <label><input type="checkbox" /> Engineering</label>
            <label><input type="checkbox" /> Human Resources</label>
          </div>
          <div className="filter-group"><strong>JOB TYPE</strong>
            <label><input type="checkbox" /> Full-time</label>
            <label><input type="checkbox" /> Part-time</label>
            <label><input type="checkbox" /> Contract</label>
            <label><input type="checkbox" /> Remote</label>
            <label><input type="checkbox" /> Internship</label>
          </div>
        </aside>

        <section className="jobs-list">
          <div className="jobs-header">
            <h2>8 Jobs Found</h2>
            <span>Showing opportunities across Cameroon</span>
            <select><option>Most Recent</option></select>
          </div>
          {jobs.map((job, index) => (
            <article key={index} className="job-card">
              <div className="logo-placeholder">{job.company.substring(0, 2)}</div>
              <div className="job-content">
                <div className="job-title-row">
                  <h3>{job.title}</h3>
                  <span className="job-type">Full-time</span>
                </div>
                <p className="job-company">{job.company}</p>
                <p className="job-location">{job.location} · Information Technology · {job.days}</p>
                <p className="job-description">We are looking for an experienced candidate to join our team and support digital transformation initiatives across Cameroon.</p>
                <p className="salary">{job.salary}</p>
              </div>
              <button className="details">View Details</button>
            </article>
          ))}
        </section>
      </main>

      <section className="featured" id="companies">
        <h2>Featured Companies</h2>
        <p>Top employers hiring in Cameroon</p>
        <div className="featured-grid">
          {featured.map((name, index) => (
            <article key={index} className="company-card">
              <div className="company-logo">{name.split(' ')[0][0]}{name.split(' ')[1] ? name.split(' ')[1][0] : ''}</div>
              <p>{name}</p>
              <span>{Math.floor(Math.random() * 8) + 4} open positions</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer" id="about">
        <div>
          <h3>KarmerWork</h3>
          <p>Find talent with opportunity across Cameroon.</p>
        </div>
        <div>
          <h4>For Job Seekers</h4>
          <a href="#">Browse Jobs</a>
          <a href="#">Create Profile</a>
          <a href="#">Upload Resume</a>
          <a href="#">Job Alerts</a>
        </div>
        <div>
          <h4>For Employers</h4>
          <a href="#">Post a Job</a>
          <a href="#">Search Candidates</a>
          <a href="#">Pricing</a>
          <a href="#">Employer Resources</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;