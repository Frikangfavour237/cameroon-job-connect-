// Audit logging service for frontend
// Tracks user actions and sends them to backend for audit logging

const API_BASE_URL = 'http://localhost:8081/api';

class AuditLogService {
  constructor() {
    this.sessionStartTime = Date.now();
    this.loginStartTime = null;
    this.dashboardAccessTime = null;
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Mark the start of login process
   */
  startLogin() {
    this.loginStartTime = Date.now();
    console.log('[AUDIT] Login started at', new Date(this.loginStartTime).toISOString());
  }

  /**
   * Record successful login with duration
   */
  logLoginSuccess(sessionId, loginTime) {
    const duration = Date.now() - this.loginStartTime;
    console.log('[AUDIT] Login successful. Duration:', duration, 'ms, Session:', sessionId);
    
    // Store in localStorage for later reference
    localStorage.setItem('lastLoginTime', JSON.stringify({
      sessionId,
      timestamp: new Date().toISOString(),
      duration
    }));
  }

  /**
   * Mark the time user reaches dashboard
   */
  recordDashboardAccess(userEmail) {
    this.dashboardAccessTime = Date.now();
    const loginToDashboardTime = this.dashboardAccessTime - this.loginStartTime;
    
    console.log('[AUDIT] Dashboard accessed at', new Date(this.dashboardAccessTime).toISOString());
    console.log('[AUDIT] Time from login to dashboard:', loginToDashboardTime, 'ms');
    
    // Store dashboard access time
    localStorage.setItem('dashboardAccessTime', JSON.stringify({
      email: userEmail,
      timestamp: new Date().toISOString(),
      loginToDashboardTime,
      sessionId: this.sessionId
    }));
  }

  /**
   * Log a page visit
   */
  logPageVisit(page, details = {}) {
    console.log('[AUDIT] Page visited:', page, details);
    
    const logEntry = {
      action: 'PAGE_VISIT',
      page,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      details
    };
    
    this.addToLocalLog(logEntry);
  }

  /**
   * Log an action (button click, form submission, etc.)
   */
  logAction(action, details = {}) {
    console.log('[AUDIT] Action:', action, details);
    
    const logEntry = {
      action,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      details
    };
    
    this.addToLocalLog(logEntry);
  }

  /**
   * Log logout
   */
  logLogout(userEmail) {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    console.log('[AUDIT] User logged out');
    console.log('[AUDIT] Session duration:', sessionDuration, 'ms');
    
    const logEntry = {
      action: 'LOGOUT',
      email: userEmail,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      sessionDuration
    };
    
    this.addToLocalLog(logEntry);
    
    // Send all logs to backend before logout
    this.flushLogs();
  }

  /**
   * Add log entry to local storage
   */
  addToLocalLog(logEntry) {
    let logs = localStorage.getItem('auditLogs');
    logs = logs ? JSON.parse(logs) : [];
    logs.push(logEntry);
    localStorage.setItem('auditLogs', JSON.stringify(logs));
  }

  /**
   * Get all local logs
   */
  getLocalLogs() {
    const logs = localStorage.getItem('auditLogs');
    return logs ? JSON.parse(logs) : [];
  }

  /**
   * Send logs to backend
   */
  async flushLogs() {
    const logs = this.getLocalLogs();
    if (logs.length === 0) return;

    try {
      const response = await fetch(`${API_BASE_URL}/audit-logs/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs })
      });

      if (response.ok) {
        console.log('[AUDIT] Logs sent to backend successfully');
        localStorage.removeItem('auditLogs');
      }
    } catch (error) {
      console.error('[AUDIT] Failed to send logs to backend:', error);
    }
  }

  /**
   * Get browser and device info
   */
  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  }

  /**
   * Clear all audit logs
   */
  clearLogs() {
    localStorage.removeItem('auditLogs');
    localStorage.removeItem('lastLoginTime');
    localStorage.removeItem('dashboardAccessTime');
  }
}

export default new AuditLogService();
