import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { BiCart } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { HiChartBar, HiHeart, HiUser } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../data/consts";

function NavUser() {
  return (
    <>
      <Navbar className="p-5" fluid>
        <Navbar.Brand className="items-center justify-center">
          <Link to="/" className="flex items-center">
            <img
              src="/image/logo.png"
              className="mr-2 h-10 w-10 sm:h-9  "
              alt="logo"
            />
            <h2 className="font-bold text-[#2098e3] text-xl">{COMPANY_NAME}</h2>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-8 items-center">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex flex-col justify-center items-center ">
                <FaRegUser className="text-xl text-gray-600" />
                <span className="text-sm text-gray-700">User</span>
              </div>
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

          <Link  className="flex flex-col justify-center items-center ">
            <FaRegHeart className="text-xl text-gray-600" />
            <span className="text-sm text-gray-700">Wishlist
            </span>
          </Link>
          <Link  className="flex flex-col justify-center items-center ">
            <SlHandbag className="text-xl text-gray-600" />
            <span className="text-sm text-gray-700">Bag</span>
          </Link>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/men">
            <Navbar.Link href="#">Men</Navbar.Link>
          </Link>
          <Link to="/women">
            <Navbar.Link href="#">Women</Navbar.Link>
          </Link>
          <Link to="/kid">
            <Navbar.Link href="#">Kid</Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavUser;
