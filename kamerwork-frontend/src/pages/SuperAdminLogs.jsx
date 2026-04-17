import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import './SuperAdminLogs.css';

const SuperAdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [filterType, setFilterType] = useState('all'); // all, email, action, session, range
  const [filterValue, setFilterValue] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  
  // User role check
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    // Check if user is superadmin
    if (userRole !== 'SUPERADMIN') {
      setError('Access Denied: Only superadmins can view audit logs');
      setLoading(false);
      return;
    }

    // Load all logs on component mount
    loadAllLogs();
  }, [userRole]);

  const loadAllLogs = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get all logs by fetching multiple actions
      const allActions = ['LOGIN', 'LOGOUT', 'REGISTER', 'FAILED_LOGIN', 'PAGE_VISIT', 'ACTION'];
      let allLogs = [];
      
      // For now, we'll load logs by getting a sample
      // In production, you'd have a "get all logs" endpoint
      const response = await axios.get('/audit-logs/action/LOGIN');
      setLogs(response.data);
      setFilteredLogs(response.data);
    } catch (err) {
      setError('Failed to load audit logs: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      setError('');
      let response;

      if (filterType === 'email' && filterValue) {
        response = await axios.get(`/audit-logs/user/${filterValue}`);
      } else if (filterType === 'action' && filterAction) {
        response = await axios.get(`/audit-logs/action/${filterAction}`);
      } else if (filterType === 'session' && filterValue) {
        response = await axios.get(`/audit-logs/session/${filterValue}`);
      } else if (filterType === 'range' && startDate && endDate) {
        response = await axios.get(`/audit-logs/range?startTime=${startDate}&endTime=${endDate}`);
      } else {
        setError('Please fill in all required filter fields');
        setLoading(false);
        return;
      }

      setFilteredLogs(response.data);
      setCurrentPage(1);
    } catch (err) {
      setError('Filter failed: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilterType('all');
    setFilterValue('');
    setFilterAction('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    loadAllLogs();
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit_logs_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const downloadCSV = () => {
    const headers = ['Email', 'Action', 'Status', 'Duration (ms)', 'IP Address', 'Timestamp'];
    const rows = filteredLogs.map(log => [
      log.email,
      log.action,
      log.status,
      log.durationMs || '-',
      log.ipAddress || '-',
      new Date(log.timestamp).toLocaleString()
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIdx, endIdx);

  if (loading) {
    return (
      <div className="superadmin-logs">
        <div className="loading">Loading audit logs...</div>
      </div>
    );
  }

  if (userRole !== 'SUPERADMIN') {
    return (
      <div className="superadmin-logs">
        <div className="error-container">
          <h1>Access Denied</h1>
          <p>Only superadmins can view audit logs.</p>
          <p>Current Role: {userRole || 'Not logged in'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="superadmin-logs">
      <div className="logs-header">
        <h1>Audit Logs Dashboard</h1>
        <p className="subtitle">Monitor all system activities and user interactions</p>
      </div>

      <div className="filters-section">
        <div className="filter-card">
          <h3>Filter Logs</h3>
          
          <div className="filter-group">
            <label>Filter Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Logs</option>
              <option value="email">By Email</option>
              <option value="action">By Action</option>
              <option value="session">By Session ID</option>
              <option value="range">By Date Range</option>
            </select>
          </div>

          {filterType === 'email' && (
            <div className="filter-group">
              <label>User Email:</label>
              <input
                type="email"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
          )}

          {filterType === 'action' && (
            <div className="filter-group">
              <label>Action Type:</label>
              <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)}>
                <option value="">Select action...</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="REGISTER">Register</option>
                <option value="PAGE_VISIT">Page Visit</option>
                <option value="FAILED_LOGIN">Failed Login</option>
                <option value="PASSWORD_RESET">Password Reset</option>
              </select>
            </div>
          )}

          {filterType === 'session' && (
            <div className="filter-group">
              <label>Session ID:</label>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="session_id_xxx"
              />
            </div>
          )}

          {filterType === 'range' && (
            <>
              <div className="filter-group">
                <label>Start Date & Time:</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>End Date & Time:</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="filter-actions">
            <button className="btn-filter" onClick={handleFilter}>
              Apply Filter
            </button>
            <button className="btn-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="export-card">
          <h3>Export Data</h3>
          <button className="btn-export" onClick={exportLogs}>
            Download JSON
          </button>
          <button className="btn-export csv" onClick={downloadCSV}>
            Download CSV
          </button>
          <p className="export-info">Total Records: {filteredLogs.length}</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {filteredLogs.length === 0 ? (
        <div className="no-logs">
          <p>No audit logs found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="logs-table">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Status</th>
                  <th>Duration (ms)</th>
                  <th>IP Address</th>
                  <th>Session ID</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className={`status-${log.status?.toLowerCase()}`}>
                    <td className="timestamp">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="email">{log.email}</td>
                    <td className="action">
                      <span className="action-badge">{log.action}</span>
                    </td>
                    <td className="status">
                      <span className={`status-badge status-${log.status?.toLowerCase()}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="duration">
                      {log.durationMs ? `${log.durationMs}ms` : '-'}
                    </td>
                    <td className="ip">
                      {log.ipAddress || '-'}
                    </td>
                    <td className="session">
                      <code>{log.sessionId?.substring(0, 12)}...</code>
                    </td>
                    <td className="details">
                      {log.details && (
                        <span title={log.details} className="details-preview">
                          {log.details.substring(0, 30)}...
                        </span>
                      )}
                      {log.errorMessage && (
                        <span title={log.errorMessage} className="error-preview">
                          Error: {log.errorMessage.substring(0, 20)}...
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </button>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages} ({filteredLogs.length} total records)
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminLogs;
