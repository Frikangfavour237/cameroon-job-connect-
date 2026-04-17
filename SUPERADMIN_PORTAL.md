# SuperAdmin Audit Logging Portal - Quick Start Guide

## Overview
A dedicated SuperAdmin portal has been created for system administrators to view, monitor, and analyze all audit logs in the Kamerwork system. This portal is **completely separate from the regular user system** and restricted to superadmin-only access.

## Access the SuperAdmin Portal

### URL
```
http://localhost:3000/admin/login
```

### Login Credentials
- **Email**: Any email address (for logging purposes)
- **Password**: Any password (placeholder)
- **SuperAdmin Secret Key**: `SUPERADMIN_SECRET_2026`

### Security Features
✅ Requires secret key authentication
✅ CAPTCHA verification
✅ All access attempts are logged
✅ Role-based access control (SUPERADMIN role only)
✅ Session tracking for all admin activities

## SuperAdmin Portal Features

### 1. **Filter Logs**
Multiple ways to view audit logs:

#### By All Logs (Latest 1000)
- Default view showing most recent logs
- Sorted by timestamp (newest first)

#### By Email Address
- View all activities for a specific user
- Track user's complete action history
- Useful for investigating user behavior

#### By Action Type
- **LOGIN**: User login attempts (success/failed)
- **LOGOUT**: User logout
- **REGISTER**: New user registration
- **PAGE_VISIT**: Page navigation
- **PASSWORD_RESET**: Password reset attempts
- **FAILED_LOGIN**: Failed login attempts

#### By Session ID
- View all activities within a single session
- Track complete user journey
- Monitor session duration

#### By Date Range
- Query logs between specific dates
- Perfect for incident investigation
- Analyze activity trends

### 2. **View Log Details**
Each log entry shows:
- **Timestamp**: When the action occurred
- **Email**: User who performed the action
- **Action**: Type of action (LOGIN, LOGOUT, etc.)
- **Status**: SUCCESS, FAILED, or ERROR
- **Duration**: How long the action took (in milliseconds)
- **IP Address**: Source IP of the request
- **Session ID**: Unique session identifier
- **Details**: Additional information about the action

### 3. **Export Data**
Download logs for external analysis:
- **JSON Format**: Full log objects with all fields
- **CSV Format**: Spreadsheet-friendly format

### 4. **Performance Metrics**
View system-wide statistics:
- Total login attempts
- Successful vs. failed logins
- Success rate percentage
- Average login duration
- Maximum login duration

## API Endpoints (for advanced users)

### Get All Logs
```bash
GET http://localhost:8081/api/audit-logs/all
```

### Get User's Logs
```bash
GET http://localhost:8081/api/audit-logs/user/{email}
```

### Get Action Logs
```bash
GET http://localhost:8081/api/audit-logs/action/{action}
```
Actions: LOGIN, LOGOUT, REGISTER, PAGE_VISIT, FAILED_LOGIN, PASSWORD_RESET

### Get Session Logs
```bash
GET http://localhost:8081/api/audit-logs/session/{sessionId}
```

### Get Logs in Date Range
```bash
GET http://localhost:8081/api/audit-logs/range?startTime=2026-04-16T10:00:00&endTime=2026-04-16T15:00:00
```

### Get Login Performance Stats
```bash
GET http://localhost:8081/api/audit-logs/stats/login-performance
```

Returns:
```json
{
  "total_logins": 150,
  "successful_logins": 145,
  "failed_logins": 5,
  "success_rate": 96.67,
  "avg_login_duration_ms": 1250,
  "max_login_duration_ms": 5340
}
```

## Key Metrics to Monitor

### 1. **Login Performance**
- **Metric**: Average login duration
- **Target**: < 2000ms (2 seconds)
- **Action**: If > 3000ms, investigate server performance

### 2. **Failed Logins**
- **Metric**: Number of failed login attempts
- **Watch for**: Spikes in failed attempts (potential attack/compromised credentials)
- **Action**: Check IP addresses and send security alerts

### 3. **User Activity Timeline**
- **Use**: Track user journey through the system
- **Identify**: Where users spend time, navigation patterns
- **Optimize**: Based on user behavior

### 4. **Session Duration**
- **Metric**: Average session length
- **Identify**: User engagement levels
- **Improve**: System performance if sessions are short

## Use Cases

### Investigate a Security Incident
```
1. Go to "By Email" filter
2. Enter suspicious user email
3. Review all their login attempts and failed attempts
4. Check IP addresses for unauthorized access patterns
5. Export logs for security team analysis
```

### Analyze Login Performance Trends
```
1. Click "By Date Range"
2. Select date range
3. Filter by "LOGIN" action
4. Review average duration over time
5. Export for trend analysis
```

### Track User Session Activity
```
1. Use "By Session ID" filter
2. Enter session ID from user's login
3. See complete activity timeline
4. Identify what user did in that session
```

### Find Failed Login Attempts
```
1. Filter by action "FAILED_LOGIN"
2. Review failed attempts grouped by IP
3. Identify patterns of brute-force attacks
4. Block suspicious IPs if needed
```

## Log File Backup Location

For additional security, all logs are also backed up in:
```
./logs/audit_YYYY-MM-DD.log
```

These files exist on the backend server and provide immutable audit trail.

## Example Log Entry

```
{
  "id": "log_12345",
  "email": "user@example.com",
  "userId": "user123",
  "action": "LOGIN",
  "status": "SUCCESS",
  "startTime": "2026-04-16T14:30:45.123Z",
  "endTime": "2026-04-16T14:30:47.456Z",
  "durationMs": 2333,
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "details": "User logged in successfully, role: EMPLOYER",
  "timestamp": "2026-04-16T14:30:47.456Z",
  "sessionId": "session_1234567890_abc123"
}
```

## Security Best Practices

1. **Change Secret Key**: Replace `SUPERADMIN_SECRET_2026` in production
2. **Use HTTPS**: Always use HTTPS for admin portal access
3. **Monitor Admin Access**: Track who accesses the admin portal
4. **Regular Reviews**: Review logs regularly for suspicious activity
5. **Data Retention**: Archive old logs according to compliance requirements
6. **Access Control**: Limit superadmin access to authorized personnel only

## Troubleshooting

### No logs appear
- Check backend server is running
- Verify MongoDB is connected
- Look at backend logs for errors

### Can't access admin portal
- Verify you're using correct secret key
- Check that role is set to SUPERADMIN in localStorage
- Clear browser cache and try again

### Export not working
- Check browser's download permissions
- Ensure popup blockers are not interfering
- Try different export format (JSON or CSV)

## Performance Considerations

- Default query returns 1000 most recent logs
- Large date ranges may take longer to load
- Pagination loads 50 records per page
- Export creates file in browser (no server processing)

## Next Steps

1. **Create Superadmin Account**
   - Contact system administrator
   - Provide your email
   - Get assigned unique secret key

2. **First Login**
   - Visit `/admin/login`
   - Enter credentials and secret key
   - Review recent logs

3. **Set Up Monitoring**
   - Create bookmarks for common queries
   - Set up regular log reviews
   - Establish alert thresholds

4. **Integration**
   - Export logs to SIEM (Security Information and Event Management)
   - Connect to analytics platform
   - Set up automated alerts

---

For detailed technical documentation, see `AUDIT_LOGGING_SYSTEM.md`
