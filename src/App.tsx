import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';

// Dashboards
import { SuperAdminDashboard } from './pages/admin/SuperAdminDashboard';
import { HODDashboard } from './pages/hod/HODDashboard';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';

// Modules
import { CollegeOverviewPage } from './pages/overview/CollegeOverviewPage';
import { DepartmentManagementPage } from './pages/departments/DepartmentManagementPage';
import { DepartmentDetailPage } from './pages/departments/DepartmentDetailPage';
import { StudentManagementPage } from './pages/students/StudentManagementPage';
import { FacultyManagementPage } from './pages/faculty/FacultyManagementPage';
import { AttendanceManagementPage } from './pages/attendance/AttendanceManagementPage';
import { AcademicManagementPage } from './pages/academics/AcademicManagementPage';
import { SubjectTrackingPage } from './pages/subjects/SubjectTrackingPage';
import { AssignmentManagementPage } from './pages/assignments/AssignmentManagementPage';
import { ExaminationResultsPage } from './pages/examinations/ExaminationResultsPage';
import { TimetableManagementPage } from './pages/timetable/TimetableManagementPage';
import { PlacementTrackerPage } from './pages/placements/PlacementTrackerPage';
import { EventsClubsPage } from './pages/events/EventsClubsPage';
import { NoticesAnnouncementsPage } from './pages/notices/NoticesAnnouncementsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ComplaintsHelpdeskPage } from './pages/complaints/ComplaintsHelpdeskPage';
import { LeaveApprovalPage } from './pages/leaves/LeaveApprovalPage';
import { ReportsAnalyticsPage } from './pages/reports/ReportsAnalyticsPage';
import { StudentLeaderboardPage } from './pages/leaderboard/StudentLeaderboardPage';
import { AchievementsCertificatesPage } from './pages/achievements/AchievementsCertificatesPage';
import { ProfileSettingsPage } from './pages/settings/ProfileSettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Root index redirector
const RootRedirector: React.FC = () => {
  const { isAuthenticated, role, getDashboardRoute } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getDashboardRoute(role)} replace />;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Authenticated SaaS Layout */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<RootRedirector />} />

                {/* Role Dashboards */}
                <Route path="dashboard/admin" element={<SuperAdminDashboard />} />
                <Route path="dashboard/hod" element={<HODDashboard />} />
                <Route path="dashboard/faculty" element={<FacultyDashboard />} />
                <Route path="dashboard/student" element={<StudentDashboard />} />

                {/* All 20 Functional Modules */}
                <Route path="college-overview" element={<CollegeOverviewPage />} />
                <Route path="departments" element={<DepartmentManagementPage />} />
                <Route path="departments/:deptId" element={<DepartmentDetailPage />} />
                <Route path="students" element={<StudentManagementPage />} />
                <Route path="faculty" element={<FacultyManagementPage />} />
                <Route path="attendance" element={<AttendanceManagementPage />} />
                <Route path="academics" element={<AcademicManagementPage />} />
                <Route path="subjects" element={<SubjectTrackingPage />} />
                <Route path="assignments" element={<AssignmentManagementPage />} />
                <Route path="examinations" element={<ExaminationResultsPage />} />
                <Route path="timetable" element={<TimetableManagementPage />} />
                <Route path="placements" element={<PlacementTrackerPage />} />
                <Route path="events" element={<EventsClubsPage />} />
                <Route path="notices" element={<NoticesAnnouncementsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="complaints" element={<ComplaintsHelpdeskPage />} />
                <Route path="leaves" element={<LeaveApprovalPage />} />
                <Route path="reports" element={<ReportsAnalyticsPage />} />
                <Route path="leaderboard" element={<StudentLeaderboardPage />} />
                <Route path="achievements" element={<AchievementsCertificatesPage />} />
                <Route path="settings" element={<ProfileSettingsPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<RootRedirector />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
