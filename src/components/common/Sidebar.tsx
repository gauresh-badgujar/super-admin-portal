import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          SA
        </div>

        <div className="sidebar-logo-text">
          <strong>Super Admin</strong>
          <span>Admin Portal</span>
        </div>
      </div>

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">♙</span>
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/tenants"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">▣</span>
          <span>Tenants</span>
        </NavLink>

        <NavLink
          to="/audit-logs"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">☷</span>
          <span>Audit Logs</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-admin">
          <div className="sidebar-admin-avatar">
            SA
          </div>

          <div className="sidebar-admin-info">
            <strong>Super Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;