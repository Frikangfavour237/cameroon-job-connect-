// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/Resetpassword";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerDashboardOverview from "./pages/EmployerDashboardOverview";
import EmployerJobs from "./pages/EmployerJobs";
import EmployerCandidates from "./pages/EmployerCandidates";
import EmployerInbox from "./pages/EmployerInbox";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerSettings from "./pages/EmployerSettings";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminLogs from "./pages/SuperAdminLogs";

const normalizeRole = (role) => {
  if (!role) {
    return "EMPLOYEE";
  }

  return String(role).replace(/^ROLE_/, "").toUpperCase();
};

function HomeRoute() {
  const token = localStorage.getItem("token");
  const role = normalizeRole(localStorage.getItem("role"));

  if (!token) {
    return <LandingPage />;
  }

  if (role === "SUPERADMIN") {
    return <Navigate to="/admin/logs" replace />;
  }

  if (role === "EMPLOYER") {
    return <Navigate to="/employer-dashboard" replace />;
  }

  return <Navigate to="/employee-dashboard" replace />;
}

// Protected route for superadmin
function ProtectedAdminRoute({ children }) {
  const role = normalizeRole(localStorage.getItem("role"));
  
  if (role !== "SUPERADMIN") {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

// Wrapper to handle navigation from Login
function LoginWrapper() {
  const navigate = useNavigate();
  return (
    <Login
      onRegister={() => navigate("/register")}
      onForgotPassword={() => navigate("/forgot-password")}
    />
  );
}

function ForgotPasswordWrapper() {
  const navigate = useNavigate();
  return <ForgotPassword onBack={() => navigate("/login")} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordWrapper />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* SuperAdmin Routes */}
        <Route path="/admin/login" element={<SuperAdminLogin />} />
        <Route 
          path="/admin/logs" 
          element={
            <ProtectedAdminRoute>
              <SuperAdminLogs />
            </ProtectedAdminRoute>
          } 
        />
        
        {/* Employer Routes */}
        <Route path="/employer-dashboard/*" element={<EmployerDashboard />}>
          <Route index element={<EmployerDashboardOverview />} />
          <Route path="jobs" element={<EmployerJobs />} />
          <Route path="candidates" element={<EmployerCandidates />} />
          <Route path="inbox" element={<EmployerInbox />} />
          <Route path="profile" element={<EmployerProfile />} />
          <Route path="settings" element={<EmployerSettings />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
