import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { HiHeart, HiShoppingCart, HiUser } from "react-icons/hi";
import { COMPANY_NAME } from "../../data/consts";
import { dropdownLinks, navLinks } from "../../data/layout";
import { Link } from "react-router-dom";
import CartDrawer from "../../components/cart/CartDrawer";
import { toast } from "react-toastify";
import { logout } from "../../services/apiServices";

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState();
  const user = useSelector((store) => {
    return store.user.user;
  });

  const dispatch = useDispatch();

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  async function handleLogout() {
    const response = await logout();
    dispatch(logoutUser());
    if (response.status === 200) {
      toast.warning("Logout Successfully");
    } else {
      toast.error(response.msg);
    }
  }

  return (
    <Navbar fluid className="border-b">
      <div className="flex items-center gap-8">
        <Navbar.Brand className="flex items-center gap-2">
          <HiShoppingCart className="text-2xl text-orange-500" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {COMPANY_NAME}
          </span>
        </Navbar.Brand>
      </div>
      <div className="flex md:order-2">
        <div className="flex items-center gap-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="bg-slate-300 p-2 rounded-full">
                <HiUser className="text-2xl" />
              </div>
            }>
            <Dropdown.Header>
              <span className="block text-sm">{user?.fname}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Toggle />
      </div>
      <CartDrawer isOpen={isOpen} handleToggle={handleToggle} />
    </Navbar>
  );
}

export default NavbarAdmin;
