import React from "react";
import NavUser from "./NavUser";
import { Outlet } from "react-router-dom";
import UserFooter from "./UserFooter";

function UserLayout() {
  return (
    <>
      <NavUser />
      <Outlet />
      <UserFooter />
    </>
  );
}

export default UserLayout;
