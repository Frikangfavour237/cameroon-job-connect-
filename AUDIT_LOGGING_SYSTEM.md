# Comprehensive Audit Logging System - Documentation

## Overview
A complete audit logging system has been implemented for the Kamerwork application to track all user activities, including login times, dashboard access times, and system operations.

## Backend Components

### 1. **AuditLog Model** (`models/AuditLog.java`)
MongoDB document that stores comprehensive audit information:
- **id**: Unique identifier
- **email**: User email address
- **userId**: User ID
- **action**: Type of action (LOGIN, LOGOUT, REGISTER, VIEW_PAGE, UPDATE_PROFILE, etc.)
- **details**: Additional context about the action
- **startTime**: When the action started
- **endTime**: When the action completed
- **durationMs**: Duration in milliseconds
- **ipAddress**: Client IP address
- **userAgent**: Browser/client information
- **status**: SUCCESS, FAILED, or ERROR
- **errorMessage**: Error details if applicable
- **timestamp**: When logged to database
- **sessionId**: Unique session identifier

### 2. **AuditLogRepository** (`repositories/AuditLogRepository.java`)
Data access methods:
- `findByEmail(String email)` - Get all logs for a user
- `findByAction(String action)` - Get logs for a specific action
- `findBySessionId(String sessionId)` - Get all logs from a session
- `findByTimestampBetween(LocalDateTime, LocalDateTime)` - Get logs within time range
- `findByEmailAndAction(String, String)` - Get specific action logs for a user

### 3. **Enhanced ActivityLogService** (`services/ActivityLogService.java`)
Core logging service with file and database storage:

#### Methods:
- `log(String email, String activity)` - Simple activity log
- `logActivity(String email, String userId, String action, String details, String ipAddress, String userAgent, String status, String errorMessage)` - Comprehensive logging
- `startActionLog(String email, String userId, String action, String ipAddress, String userAgent)` - Start tracking an action and return logId
- `endActionLog(String logId, String status, String details, Long durationMs, String errorMessage)` - Complete action tracking with duration
- `getUserAuditLogs(String email)` - Retrieve user's audit logs
- `getActionLogs(String action)` - Retrieve logs for a specific action
- `getSessionLogs(String sessionId)` - Retrieve session logs
- `getLogsInTimeRange(LocalDateTime, LocalDateTime)` - Retrieve logs within time range

#### File Storage:
Logs are written to `./logs/audit_YYYY-MM-DD.log` files with the following format:
```
[YYYY-MM-DD HH:mm:ss.SSS] EMAIL='user@example.com' USER_ID='123' ACTION='LOGIN' STATUS='SUCCESS' DETAILS='...' IP_ADDRESS='192.168.1.1'
```

### 4. **AuditLogFilter** (`config/AuditLoggingFilter.java`)
Spring filter that logs all HTTP requests:
- Records request method, URI, duration, IP address
- Automatically extracts client IP from headers
- Logs response status codes

### 5. **AuditLogController** (`controllers/AuditLogController.java`)
REST endpoints to retrieve audit logs:
- `GET /audit-logs/user/{email}` - Get all logs for a user
- `GET /audit-logs/action/{action}` - Get logs for a specific action
- `GET /audit-logs/session/{sessionId}` - Get session logs
- `GET /audit-logs/range?startTime=...&endTime=...` - Get logs within time range

### 6. **Enhanced AuthController** (`controllers/AuthController.java`)
Updated to capture IP address and user agent for all auth operations:
```java
String ipAddress = getClientIpAddress(httpRequest);
String userAgent = httpRequest.getHeader("User-Agent");
```

### 7. **Enhanced AuthService** (`services/AuthService.java`)
Comprehensive audit logging for all auth operations:

#### Registration:
- Logs registration attempts with role validation
- Tracks success/failure reasons
- Records IP and user agent

#### Login:
- **startActionLog**: Begins tracking from login start
- **endActionLog**: Completes tracking with duration in milliseconds
- Records:
  - captcha verification failures
  - user not found
  - invalid credentials
  - successful login
  - login duration (time from login request to successful auth)

#### Password Reset:
- Tracks forgot password requests
- Logs reset attempts
- Records expiration failures

#### Response Fields:
- `sessionId`: Unique session identifier
- `loginDurationMs`: Time taken for login (in milliseconds)

### 8. **Enhanced AuthResponse DTO** (`dto/AuthResponse.java`)
Added fields:
- `sessionId`: Unique session identifier for tracking
- `loginDurationMs`: Duration of login process in milliseconds

## Frontend Components

### 1. **AuditLogService** (`services/auditLogService.js`)
Client-side audit tracking service:

#### Key Methods:
- `startLogin()` - Mark login process start
- `logLoginSuccess(sessionId, loginTime)` - Record successful login
- `recordDashboardAccess(userEmail)` - Mark time user reaches dashboard
- `logPageVisit(page, details)` - Log page visits
- `logAction(action, details)` - Log user actions
- `logLogout(userEmail)` - Log logout with session duration
- `flushLogs()` - Send accumulated logs to backend

#### LocalStorage Data:
- `lastLoginTime` - Login duration and session info
- `dashboardAccessTime` - Dashboard access time and login-to-dashboard duration
- `auditLogs` - Buffer of pending logs to send to backend

### 2. **Enhanced Login Page** (`pages/Login.jsx`)
Added audit tracking:
```javascript
auditLogService.startLogin(); // Track login start
auditLogService.logLoginSuccess(sessionId, duration); // Track success
auditLogService.logAction("LOGIN_FAILED", {...}); // Track failures
```

### 3. **Enhanced EmployerDashboard** (`pages/EmployerDashboard.jsx`)
Added dashboard access tracking:
```javascript
useEffect(() => {
  auditLogService.recordDashboardAccess(email);
  auditLogService.logPageVisit("EMPLOYER_DASHBOARD", {...});
}, [email]);
```

## Key Metrics Tracked

### Login to Dashboard Time
Measures: Time from login request start → dashboard page fully loaded
- Includes: Authentication, JWT generation, page navigation, rendering
- Stored in response as `loginDurationMs`
- Also tracked client-side as `loginToDashboardTime`

### Session Duration
- Tracked from login to logout
- Includes all activities within the session

### Action Duration
- Any operation using `startActionLog/endActionLog`
- Measures: Complete action lifecycle in milliseconds

### User Activities Logged
- User Registration (with role)
- User Login (with duration, IP, user agent)
- User Logout (with session duration)
- Password Reset requests
- Forgot Password requests
- Page visits
- Custom actions

## Log File Example

```
====================================================================================================
AUDIT LOG FILE - 2026-04-16 14:30:45
====================================================================================================
[2026-04-16 14:30:45.123] EMAIL='john@example.com' USER_ID='N/A' ACTION='LOGIN' STATUS='SUCCESS' IP_ADDRESS='192.168.1.100'
[2026-04-16 14:30:47.456] EMAIL='john@example.com' USER_ID='user123' ACTION='LOGIN' STATUS='SUCCESS' DETAILS='User logged in successfully, role: EMPLOYER' IP_ADDRESS='192.168.1.100'
[2026-04-16 14:31:02.789] EMAIL='john@example.com' USER_ID='user123' ACTION='PAGE_VISIT' STATUS='SUCCESS' DETAILS='EMPLOYER_DASHBOARD'
[2026-04-16 14:35:10.012] EMAIL='john@example.com' USER_ID='user123' ACTION='LOGOUT' STATUS='SUCCESS' DETAILS='Session duration: 300000ms'
```

## Configuration

### application.yml
```yaml
audit:
  log:
    path: ./logs
```

Logs are stored in the `./logs` directory with one file per day.

## Usage Examples

### Backend: Log an action with duration
```java
// Start tracking
String logId = activityLogService.startActionLog(
    "user@example.com", 
    "userId123", 
    "PROCESS_APPLICATION", 
    "192.168.1.1", 
    "Mozilla/5.0..."
);

// Do some work
// ...

// End tracking
long duration = System.currentTimeMillis() - startTime;
activityLogService.endActionLog(
    logId, 
    "SUCCESS", 
    "Application processed successfully", 
    duration, 
    null
);
```

### Frontend: Track page access
```javascript
import auditLogService from '../services/auditLogService';

useEffect(() => {
    auditLogService.logPageVisit('MY_PAGE', {
        userId: userId,
        timestamp: new Date().toISOString()
    });
}, []);
```

### Retrieve User's Audit Logs (Backend)
```java
List<AuditLog> userLogs = activityLogService.getUserAuditLogs("user@example.com");
```

### Query via API
```bash
# Get all logs for a user
GET http://localhost:8081/api/audit-logs/user/user@example.com

# Get all login attempts
GET http://localhost:8081/api/audit-logs/action/LOGIN

# Get logs from a specific session
GET http://localhost:8081/api/audit-logs/session/session_id_123

# Get logs within a time range
GET http://localhost:8081/api/audit-logs/range?startTime=2026-04-16T10:00:00&endTime=2026-04-16T15:00:00
```

## Security Considerations

1. **Sensitive Data**: Passwords are never logged
2. **Privacy**: Email addresses are logged but full names are stored separately
3. **Session Tracking**: Each session has a unique ID for correlation
4. **Immutability**: Logs are written sequentially to files (no updates)
5. **Access Control**: Audit logs should be protected and only accessible to administrators

## Performance Impact

- Minimal performance impact: Logs are written asynchronously to files
- Database operations are indexed by email, action, timestamp
- Frontend logging is non-blocking

## Future Enhancements

1. Log rotation and archival
2. Encryption of sensitive audit data
3. Real-time audit log streaming to monitoring tools
4. Advanced filtering and analytics dashboard
5. Automatic alerts for suspicious activities (failed login attempts, etc.)
6. GDPR compliance features (log retention policies)
