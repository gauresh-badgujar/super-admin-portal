import { Outlet } from "react-router-dom";

import Sidebar from "../common/Sidebar";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;