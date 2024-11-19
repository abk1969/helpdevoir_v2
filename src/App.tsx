import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import RegisterForm from './components/auth/RegisterForm';
import AddStudentForm from './components/dashboard/AddStudentForm';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import StudentDashboard from './pages/StudentDashboard';
import SubjectHomework from './pages/SubjectHomework';
import SubscriptionPage from './pages/SubscriptionPage';
import DyslexiaPathway from './components/dyslexia/DyslexiaPathway';
import { Toaster } from 'react-hot-toast';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/register" />;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <PrivateRoute>
                <AddStudentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:studentId"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:studentId/subjects/:subjectId"
            element={
              <PrivateRoute>
                <SubjectHomework />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:studentId/dyslexia"
            element={
              <PrivateRoute>
                <DyslexiaPathway />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}