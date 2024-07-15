import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-[256px_1fr]">
        <SidebarAdmin />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
