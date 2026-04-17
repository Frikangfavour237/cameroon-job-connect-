// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { authStyles } from "../styles/authStyles.js";
import { useSearchParams, useNavigate } from "react-router-dom";

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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const token = searchParams.get("token");
  const strength = getStrength(password);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const confirm = e.target.confirmPassword.value;
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/reset-password", { 
        token, 
        newPassword: password
      });
      
      if (res.data.success) {
        setDone(true);
      } else {
        setError(res.data.message || "Error resetting password");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error resetting password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-card">
          {!token ? (
            <div className="success-state">
              <div className="success-icon">❌</div>
              <h1 className="auth-title" style={{ fontSize: "28px" }}>
                Invalid <em>Reset Link</em>
              </h1>
              <p className="auth-subtitle">
                This reset link is invalid or has expired. Please request a new one.
              </p>
              <button className="auth-btn" onClick={() => navigate("/forgot-password")}>
                Request new reset link
              </button>
            </div>
          ) : !done ? (
            <>
              <div className="auth-icon-wrap">🔒</div>
              <h1 className="auth-title">
                Set new <em>password</em>
              </h1>
              <p className="auth-subtitle">
                Choose a strong password for your account. You'll use it to sign in going forward.
              </p>

              {error && <p style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="field-group">
                  <label className="field-label" htmlFor="password">New password</label>
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
                  <label className="field-label" htmlFor="confirmPassword">Confirm new password</label>
                  <input
                    id="confirmPassword"
                    className="field-input"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repeat your new password"
                    required
                  />
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button className="auth-btn" type="submit" disabled={loading || strength < 2}>
                    {loading ? "Saving…" : "Update password →"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h1 className="auth-title" style={{ fontSize: "28px" }}>
                Password <em>updated!</em>
              </h1>
              <p className="auth-subtitle" style={{ marginBottom: "28px" }}>
                Your password has been changed successfully. You can now sign in with your new password.
              </p>
              <button className="auth-btn" onClick={handleSignIn}>
                Sign in now →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;