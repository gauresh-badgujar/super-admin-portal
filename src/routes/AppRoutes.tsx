import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/users"
        element={<UsersPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;