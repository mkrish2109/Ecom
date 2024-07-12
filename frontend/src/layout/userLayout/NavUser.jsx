import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { HiChartBar, HiHeart, HiUser } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../data/consts";
import CartDrawer from "../../components/cart/CartDrawer";
import { logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import cartSliceReducer from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { dropdownLinks } from "../../data/layout";

function NavUser() {
  const [isOpen, setIsOpen] = useState();
  const user = useSelector((store) => {
    return store.user;
  });
  function handleToggle() {
    setIsOpen(!isOpen);
  }

  async function handleLogOut() {
    const response = await logout();
    if (response.status === 200) {
      toast.warning("Logouy Successfully");
    } else {
      toast.error(response.msg);
    }
  }
  return (
    <>
      <Navbar className="py-4 sm:px-8" fluid>
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
                <span className="text-sm font-bold text-gray-700">Profile</span>
              </div>
            }>
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                {console.log("user", user)}
              </span>
            </Dropdown.Header>
            {dropdownLinks.map((link) => {
              return (
                <Dropdown.Item key={link.id}>
                  <Link to={link.url}>{link.name}</Link>
                </Dropdown.Item>
              );
            })}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            <Link to="/login">
              <Dropdown.Item>Sign In</Dropdown.Item>
            </Link>
          </Dropdown>

          <Link
            className="flex flex-col justify-center items-center "
            to="/wishlist">
            <FaRegHeart className="text-xl text-gray-600" />
            <span className="text-sm font-bold text-gray-700">Wishlist</span>
          </Link>
          <Link
            className="flex flex-col justify-center items-center "
            onClick={handleToggle}>
            <SlHandbag className="text-xl text-gray-600" />
            <span className="text-sm font-bold text-gray-700">Bag</span>
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
        <CartDrawer isOpen={isOpen} handleToggle={handleToggle} />
      </Navbar>
    </>
  );
}

export default NavUser;
