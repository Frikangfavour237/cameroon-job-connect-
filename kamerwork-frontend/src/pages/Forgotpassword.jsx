// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "../services/api";
import { authStyles } from "../styles/authStyles.js";

const ForgotPassword = ({ onBack }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-card">
          <button className="back-btn" onClick={onBack}>
            ← Back to sign in
          </button>

          {!sent ? (
            <>
              <div className="auth-icon-wrap">🔑</div>
              <h1 className="auth-title">
                Forgot your <em>password?</em>
              </h1>
              <p className="auth-subtitle">
                No worries — enter your email and we'll send you a reset link right away.
              </p>

              {error && <p style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="field-group">
                  <label className="field-label" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    className="field-input"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button className="auth-btn" type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Send reset link →"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">📬</div>
              <h1 className="auth-title" style={{ fontSize: "28px" }}>
                Check your <em>inbox</em>
              </h1>
              <p className="auth-subtitle" style={{ marginBottom: "28px" }}>
                We sent a password reset link to <strong style={{ color: "#0f172a" }}>{email}</strong>.
                The link expires in 1 hour.
              </p>
              <button className="auth-btn" onClick={() => setSent(false)}>
                Didn't receive it? Resend
              </button>
              <button className="auth-btn-outline" onClick={onBack}>
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;