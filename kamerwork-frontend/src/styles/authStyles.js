export const authStyles = `
  .auth-page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #ffffff;
    color: var(--text, #111816);
    position: relative;
    overflow: hidden;
  }

  .auth-page::before,
  .auth-page::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }

  .auth-page::before {
    width: 240px;
    height: 240px;
    top: -90px;
    right: -90px;
    background: rgba(31, 122, 63, 0.04);
  }

  .auth-page::after {
    width: 180px;
    height: 180px;
    bottom: -70px;
    left: -60px;
    background: rgba(0, 0, 0, 0.03);
  }

  .auth-card {
    width: min(100%, 480px);
    padding: 48px 44px;
    border-radius: 28px;
    background: #ffffff;
    border: 1px solid rgba(217, 226, 215, 0.95);
    box-shadow: 0 16px 40px rgba(16, 24, 18, 0.06);
    position: relative;
    z-index: 1;
    animation: authCardIn 0.45s ease both;
  }

  @keyframes authCardIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .auth-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    padding: 7px 12px;
    border-radius: 999px;
    border: 1px solid rgba(31, 122, 63, 0.18);
    background: rgba(31, 122, 63, 0.08);
    color: var(--accent-strong, #14532d);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .auth-badge::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--accent, #1f7a3f);
    box-shadow: 0 0 0 6px rgba(31, 122, 63, 0.12);
  }

  .auth-title {
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
    color: var(--ink, #0b0f0c);
    letter-spacing: -0.04em;
    margin-bottom: 10px;
  }

  .auth-title em {
    font-style: normal;
    color: var(--accent, #1f7a3f);
  }

  .auth-subtitle {
    color: var(--text-muted, #5b665e);
    font-size: 0.98rem;
    line-height: 1.65;
    margin-bottom: 28px;
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
    margin-bottom: 8px;
    color: var(--text-muted, #5b665e);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .field-input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid var(--border, #d9e2d7);
    background: #ffffff;
    color: var(--text, #111816);
    transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
    outline: none;
  }

  .field-input::placeholder {
    color: #93a097;
  }

  .field-input:focus {
    border-color: rgba(31, 122, 63, 0.52);
    box-shadow: 0 0 0 4px rgba(31, 122, 63, 0.12);
    transform: translateY(-1px);
  }

  .field-hint {
    font-size: 12px;
    color: var(--text-soft, #77827b);
    margin-top: 8px;
  }

  .field-error {
    margin-top: 8px;
    font-size: 12px;
    color: #b42318;
  }

  .password-strength {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-top: 10px;
  }

  .strength-bar {
    height: 4px;
    border-radius: 999px;
    background: #e6ebe4;
  }

  .captcha-wrapper {
    margin: 20px 0 18px;
    display: flex;
    justify-content: flex-start;
  }

  .auth-btn,
  .auth-btn-outline {
    width: 100%;
    border-radius: 14px;
    padding: 14px 16px;
    font-weight: 700;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  }

  .auth-btn {
    border: 1px solid rgba(20, 83, 45, 0.95);
    background: var(--accent, #1f7a3f);
    color: #ffffff;
    box-shadow: none;
  }

  .auth-btn:hover {
    transform: translateY(-1px);
    box-shadow: none;
  }

  .auth-btn:disabled {
    opacity: 0.72;
    cursor: not-allowed;
    transform: none;
  }

  .auth-btn-outline {
    margin-top: 10px;
    border: 1px solid var(--border, #d9e2d7);
    background: var(--surface, #ffffff);
    color: var(--ink, #0b0f0c);
  }

  .auth-btn-outline:hover {
    border-color: rgba(31, 122, 63, 0.28);
    background: var(--surface-strong, #f7f9f6);
  }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 22px 0;
    color: var(--text-soft, #77827b);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .auth-divider::before,
  .auth-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border, #d9e2d7);
  }

  .auth-footer {
    margin-top: 22px;
    text-align: center;
    color: var(--text-muted, #5b665e);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .auth-link {
    border: none;
    background: none;
    color: var(--accent-strong, #14532d);
    font-weight: 700;
    padding: 0;
  }

  .auth-link:hover {
    text-decoration: underline;
  }

  .terms-text {
    margin-top: 16px;
    text-align: center;
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-soft, #77827b);
  }

  .terms-text a {
    color: var(--accent-strong, #14532d);
    font-weight: 700;
    cursor: pointer;
  }

  .success-state {
    text-align: center;
    padding: 12px 0 4px;
  }

  .success-icon {
    width: 66px;
    height: 66px;
    margin: 0 auto 18px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    border: 2px solid rgba(31, 122, 63, 0.2);
    background: rgba(31, 122, 63, 0.08);
    color: var(--accent, #1f7a3f);
    font-size: 28px;
  }

  .otp-inputs {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 24px 0;
  }

  .otp-input {
    width: 52px;
    height: 56px;
    border-radius: 14px;
    border: 1px solid var(--border, #d9e2d7);
    background: #ffffff;
    color: var(--text, #111816);
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .otp-input:focus {
    border-color: rgba(31, 122, 63, 0.5);
    box-shadow: 0 0 0 4px rgba(31, 122, 63, 0.12);
  }

  .resend-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-soft, #77827b);
    margin-top: 8px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 18px;
    border: none;
    background: none;
    color: var(--text-soft, #77827b);
    font-weight: 600;
    padding: 0;
  }

  .back-btn:hover {
    color: var(--accent-strong, #14532d);
  }

  @media (max-width: 768px) {
    .auth-page {
      padding: 18px;
    }

    .auth-card {
      padding: 34px 22px;
      border-radius: 24px;
    }

    .field-row {
      grid-template-columns: 1fr;
    }

    .auth-title {
      font-size: 2rem;
    }

    .captcha-wrapper {
      justify-content: center;
      overflow-x: auto;
    }

    .otp-inputs {
      flex-wrap: wrap;
    }
  }
`;
