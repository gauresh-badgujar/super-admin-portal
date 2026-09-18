import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";
import TenantPage from "../pages/Tenants/TenantPage";

function AppRoutes() {
  return (
    <BrowserRouter>
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
          path="/tenants"
          element={<TenantPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;