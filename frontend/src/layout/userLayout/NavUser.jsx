import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";

function NavUser() {
  return (
    <>
      <Navbar className="p-5" fluid>
        <Navbar.Brand className="items-center justify-center">
          <img
            src="/image/logo.png"
            className="mr-1 h-10 w-10 sm:h-9"
            alt="logo"
          />
          <h2 className="font-bold text-[#2098e3] text-xl">Ecom Express</h2>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }>
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#">Men</Navbar.Link>
          <Navbar.Link href="#">Women</Navbar.Link>
          <Navbar.Link href="#">Kid</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavUser;
