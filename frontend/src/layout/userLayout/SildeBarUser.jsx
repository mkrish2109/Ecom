import { Sidebar } from "flowbite-react";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { HiLocationMarker, HiShoppingBag, HiUser } from "react-icons/hi";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";

const links = [
  { icon: <HiUser />, url: "/user/profile", name: "Profile" },
  { icon: <HiLocationMarker />, url: "/user/address", name: "Address" },
  { icon: <HiShoppingBag />, url: "/user/orders", name: "Orders" },
];

function SildeBarUser() {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="w-50">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/user/profile">
            <Sidebar.Item href="#" icon={FaRegUser}>
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/user/address">
            <Sidebar.Item href="#" icon={HiLocationMarker}>
              Address
            </Sidebar.Item>
          </Link>
          <Link to="/user/orders">
            <Sidebar.Item href="#" icon={SlHandbag}>
              Orders
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SildeBarUser;
