// src/pages/Login.jsx
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../services/api";
import { authStyles } from "../styles/authStyles.js";
import { useNavigate } from "react-router-dom";
import auditLogService from "../services/auditLogService";

const Login = ({ onForgotPassword, onRegister }) => {
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
    
    // Start tracking login time
    auditLogService.startLogin();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/auth/login", { email, password, captchaToken: captcha });
      
      if (res.data.success) {
        // Log successful login with duration
        auditLogService.logLoginSuccess(res.data.sessionId, res.data.loginDurationMs);
        
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("role", res.data.role || "EMPLOYEE");
        localStorage.setItem("fullName", res.data.fullName || "Employer");
        localStorage.setItem("email", res.data.email || email);
        localStorage.setItem("sessionId", res.data.sessionId);
        localStorage.setItem("loginDuration", res.data.loginDurationMs);

        if (res.data.role === "EMPLOYER") {
          navigate("/employer-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(res.data.message || "Login failed");
        auditLogService.logAction("LOGIN_FAILED", { 
          reason: res.data.message,
          email 
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error logging in");
      auditLogService.logAction("LOGIN_ERROR", { 
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
          <div className="auth-badge">Secure Login</div>

          <h1 className="auth-title">
            Welcome <em>back</em>
          </h1>
          <p className="auth-subtitle">Sign in to continue to your account.</p>

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
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="field-input"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
              <p className="field-hint" style={{ textAlign: "right", marginTop: "6px" }}>
                <button className="auth-link" type="button" onClick={onForgotPassword}>
                  Forgot password?
                </button>
              </p>
            </div>

            <div className="captcha-wrapper">
              <ReCAPTCHA
                sitekey="6LeJXpksAAAAALOzmjLtu8Od9xP1JNzUUo8LCiAg"
                onChange={(value) => setCaptcha(value)}
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <button className="auth-link" onClick={onRegister}>
              Create one free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;