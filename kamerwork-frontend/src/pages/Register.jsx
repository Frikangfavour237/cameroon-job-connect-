// src/pages/Register.jsx
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../services/api";
import { authStyles } from "../styles/authStyles.js";
import { useNavigate } from "react-router-dom";

const getStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "#ef4444", "#f59e0b", "#84cc16", "#22c55e"];

const Register = () => {
  const [captcha, setCaptcha] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("EMPLOYEE");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!captcha) {
      setError("Please complete the CAPTCHA");
      return;
    }
    setLoading(true);

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;
    const pw = e.target.password.value;
    const confirm = e.target.confirmPassword.value;

    if (pw !== confirm) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/auth/register", {
        fullName,
        email,
        phoneNumber,
        password: pw,
        role,
        captchaToken: captcha
      });
      
      if (res.data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-badge">Create Account</div>

          <h1 className="auth-title">
            Join us <em>today</em>
          </h1>
          <p className="auth-subtitle">Create your free account and get started in seconds.</p>

          {error && <p style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="role">Account Type</label>
              <select
                id="role"
                className="field-input"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="EMPLOYEE">Job Seeker (Employee)</option>
                <option value="EMPLOYER">Employer (Hiring)</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                className="field-input"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="email">Email address</label>
              <input
                id="email"
                className="field-input"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                className="field-input"
                name="phoneNumber"
                type="tel"
                placeholder="+237 123 456 789"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="field-input"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= strength ? strengthColor[strength] : "#e2e8f0" }}
                      />
                    ))}
                  </div>
                  <p className="field-hint" style={{ color: strengthColor[strength] }}>
                    {strengthLabel[strength]} password
                  </p>
                </>
              )}
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                className="field-input"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                required
              />
            </div>

            <div className="captcha-wrapper">
              <ReCAPTCHA sitekey="6LeJXpksAAAAALOzmjLtu8Od9xP1JNzUUo8LCiAg" onChange={(value) => setCaptcha(value)} />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account →"}
            </button>
          </form>

          <p className="terms-text">
            By signing up, you agree to our{" "}
            <a>Terms of Service</a> and <a>Privacy Policy</a>.
          </p>

          <div className="auth-footer">
            Already have an account?{" "}
            <button className="auth-link" onClick={() => navigate("/login") }>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;