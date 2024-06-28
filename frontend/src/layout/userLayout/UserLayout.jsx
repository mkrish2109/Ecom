import React from "react";
import NavUser from "./NavUser";
import { Outlet, useLocation } from "react-router-dom";
import UserFooter from "./UserFooter";

function UserLayout() {
  const { pathname } = useLocation();

  const isLoginRegister = pathname === "/login" || pathname === "/register";

  return (
    <>
      <NavUser />
      <Outlet />
      {!isLoginRegister && <UserFooter />}
    </>
  );
}

export default UserLayout;
