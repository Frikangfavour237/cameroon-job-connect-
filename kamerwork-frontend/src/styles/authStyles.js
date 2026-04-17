// src/styles/authStyles.js
export const authStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .auth-page {
    min-height: 100vh;
    background: #050708;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 24px;
  }

  .auth-page::before {
    content: '';
    position: absolute;
    top: -140px;
    right: -140px;
    width: 480px;
    height: 480px;
    background: rgba(34, 197, 94, 0.12);
    border-radius: 50%;
    pointer-events: none;
  }

  .auth-page::after {
    content: '';
    position: absolute;
    bottom: -120px;
    left: -120px;
    width: 380px;
    height: 380px;
    background: linear-gradient(180deg, rgba(34, 197, 94, 0.08), rgba(139, 92, 246, 0.12));
    border-radius: 50%;
    pointer-events: none;
  }

  .auth-card {
    background: #111827;
    border: 1.5px solid rgba(139, 92, 246, 0.18);
    border-radius: 24px;
    padding: 52px 48px;
    width: 100%;
    max-width: 460px;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.35),
      0 1px 3px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
    animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #0f172a;
    border: 1px solid #22c55e;
    color: #22c55e;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .auth-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3); }
    50%       { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.08); }
  }

  .auth-icon-wrap {
    width: 52px;
    height: 52px;
    background: #0f172a;
    border: 1.5px solid #22c55e;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 22px;
    color: #22c55e;
  }

  .auth-title {
    font-family: 'DM Serif Display', serif;
    font-size: 34px;
    color: #f8fafc;
    line-height: 1.15;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .auth-title em {
    font-style: italic;
    color: #22c55e;
  }

  .auth-subtitle {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 400;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .field-group {
    margin-bottom: 16px;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .field-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .field-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #334155;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #f8fafc;
    background: #0f172a;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }

  .field-input::placeholder { color: #6b7280; }

  .field-input:focus {
    border-color: #22c55e;
    background: #111827;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
  }

  .field-hint {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 6px;
  }

  .field-error {
    font-size: 12px;
    color: #ef4444;
    margin-top: 6px;
  }

  .password-strength {
    margin-top: 8px;
    display: flex;
    gap: 4px;
  }

  .strength-bar {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: #e2e8f0;
    transition: background 0.3s;
  }

  .strength-bar.weak   { background: #ef4444; }
  .strength-bar.medium { background: #f59e0b; }
  .strength-bar.strong { background: #22c55e; }

  .captcha-wrapper {
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
  }

  .auth-btn {
    width: 100%;
    padding: 14px;
    background: #22c55e;
    color: #0f172a;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(34, 197, 94, 0.25);
  }

  .auth-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
    pointer-events: none;
  }

  .auth-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(34, 197, 94, 0.35);
    background: #16a34a;
  }

  .auth-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  }

  .auth-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .auth-btn-outline {
    width: 100%;
    padding: 13px;
    background: #0f172a;
    color: #22c55e;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    border: 1.5px solid #22c55e;
    border-radius: 12px;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.18s ease;
    margin-top: 10px;
  }

  .auth-btn-outline:hover {
    background: #111827;
  }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 22px 0;
    color: #94a3b8;
    font-size: 11.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .auth-divider::before,
  .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #334155;
  }

  .auth-footer {
    margin-top: 22px;
    text-align: center;
    font-size: 13.5px;
    color: #94a3b8;
    line-height: 1.6;
  }

  .auth-link {
    color: #22c55e;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .auth-link:hover { text-decoration: underline; }

  .terms-text {
    font-size: 12px;
    color: #94a3b8;
    text-align: center;
    margin-top: 16px;
    line-height: 1.6;
  }

  .terms-text a {
    color: #22c55e;
    font-weight: 500;
    cursor: pointer;
  }

  .success-state {
    text-align: center;
    padding: 16px 0;
  }

  .success-icon {
    width: 64px;
    height: 64px;
    background: #111827;
    border: 2px solid #22c55e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 20px;
    animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    color: #22c55e;
  }

  @keyframes successPop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }

  .otp-inputs {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 24px 0;
  }

  .otp-input {
    width: 52px;
    height: 58px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    border: 1.5px solid #334155;
    border-radius: 12px;
    background: #0f172a;
    color: #f8fafc;
    outline: none;
    transition: all 0.2s;
    caret-color: #22c55e;
  }

  .otp-input:focus {
    border-color: #22c55e;
    background: #111827;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
  }

  .otp-input.filled {
    border-color: #22c55e;
    background: #111827;
    color: #f8fafc;
  }

  .resend-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #94a3b8;
    margin-top: 8px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    margin-bottom: 20px;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;
  }

  .back-btn:hover { color: #22c55e; }

  @media (max-width: 768px) {
    .auth-page {
      padding: 18px;
    }

    .auth-card {
      padding: 36px 28px;
    }

    .field-row {
      grid-template-columns: 1fr;
    }

    .otp-inputs {
      flex-wrap: wrap;
      justify-content: center;
    }

    .otp-input {
      width: 48px;
      height: 52px;
      font-size: 20px;
    }

    .auth-title {
      font-size: 30px;
    }

    .auth-subtitle {
      font-size: 13px;
    }

    .auth-btn,
    .auth-btn-outline {
      padding: 13px;
    }
  }
`;