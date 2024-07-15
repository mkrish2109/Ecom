import { Sidebar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const links = [
  { id: 1, name: "Dashboard", link: "/admin/dashboard" },
  { id: 2, name: "Products", link: "/admin/products" },
  { id: 3, name: "Orders", link: "/admin/orders" },
  { id: 4, name: "Users", link: "/admin/users" },
  { id: 5, name: "Account", link: "/admin/account" },
  { id: 6, name: "Log Out" },
];

function SidebarAdmin() {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="w-50">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {links.map((value, index) => {
            return (
              <div className="flex flex-col ">
                <Link to={value.link}>
                  <Sidebar.Item>
                    <div className="flex items-center gap-2">
                      <div className="[&>svg]:text-xl [&>svg]:text-gray-500">
                        {value.icon}
                      </div>
                      <div className="text-gray-500">{value.name}</div>
                    </div>
                  </Sidebar.Item>
                </Link>
              </div>
            );
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarAdmin;
