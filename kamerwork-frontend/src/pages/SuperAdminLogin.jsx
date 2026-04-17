// src/pages/SuperAdminLogin.jsx
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../services/api";
import { authStyles } from "../styles/authStyles.js";
import { useNavigate } from "react-router-dom";
import auditLogService from "../services/auditLogService";

const SuperAdminLogin = () => {
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!captcha) {
      setError("Please complete the CAPTCHA");
      return;
    }
    
    auditLogService.startLogin();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const secretKey = e.target.secretKey.value;

    try {
      // For superadmin, we verify using a special endpoint
      // In production, this would validate against your superadmin database
      
      // Hardcoded check for demo (replace with actual backend validation)
      if (secretKey === process.env.REACT_APP_SUPERADMIN_KEY || secretKey === "SUPERADMIN_SECRET_2026") {
        // Create a mock superadmin login response
        const mockResponse = {
          success: true,
          sessionId: 'superadmin_' + Date.now(),
          loginDurationMs: Date.now() - auditLogService.loginStartTime,
          token: 'superadmin_token_' + Math.random().toString(36).substr(2, 10),
          userId: 'superadmin_001',
          email: email,
          role: 'SUPERADMIN',
          fullName: 'SuperAdmin'
        };

        auditLogService.logLoginSuccess(mockResponse.sessionId, mockResponse.loginDurationMs);
        
        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("userId", mockResponse.userId);
        localStorage.setItem("role", "SUPERADMIN");
        localStorage.setItem("fullName", "SuperAdmin");
        localStorage.setItem("email", email);
        localStorage.setItem("sessionId", mockResponse.sessionId);
        localStorage.setItem("loginDuration", mockResponse.loginDurationMs);

        auditLogService.logAction("SUPERADMIN_LOGIN", { 
          email,
          timestamp: new Date().toISOString()
        });

        navigate("/admin/logs");
      } else {
        setError("Invalid superadmin credentials");
        auditLogService.logAction("SUPERADMIN_LOGIN_FAILED", { 
          reason: "Invalid credentials",
          email 
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error logging in");
      auditLogService.logAction("SUPERADMIN_LOGIN_ERROR", { 
        errorMessage: err.message,
        email 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-badge" style={{ background: '#8b5cf6' }}>
            🔐 SuperAdmin Portal
          </div>

          <h1 className="auth-title">
            Admin <em>Access</em>
          </h1>
          <p className="auth-subtitle">Restricted access - Audit logs and system monitoring.</p>

          {error && <p style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="email">Admin Email</label>
              <input
                id="email"
                className="field-input"
                name="email"
                type="email"
                placeholder="admin@example.com"
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
                placeholder="••••••••"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="secretKey">SuperAdmin Secret Key</label>
              <input
                id="secretKey"
                className="field-input"
                name="secretKey"
                type="password"
                placeholder="Enter secret key"
                required
              />
            </div>

            <div className="captcha-wrapper">
              <ReCAPTCHA
                sitekey="6LeJXpksAAAAALOzmjLtu8Od9xP1JNzUUo8LCiAg"
                onChange={(value) => setCaptcha(value)}
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Accessing System…" : "Access Admin Portal →"}
            </button>
          </form>

          <div className="auth-footer">
            <p style={{ fontSize: "12px", color: "#999", marginTop: "20px" }}>
              ⚠️  This is a restricted area. Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminLogin;
