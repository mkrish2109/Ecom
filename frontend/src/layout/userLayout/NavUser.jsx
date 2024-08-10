import { Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartDrawer from "../../components/cart/CartDrawer";
import { COMPANY_NAME } from "../../data/consts";
import { dropdownLinks } from "../../data/layout";
import { logoutUser } from "../../redux/slices/userSlice";
import { getAllPages, logout } from "../../services/apiServices";

function NavUser() {
  const [isCartOpen, setCartIsOpen] = useState();
  const [pages, setPages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPages().then((data) => {
      setPages(
        data?.data?.map((v) => {
          return { name: v.name, id: v._id, slug: v.slug };
        })
      );
    });
  }, []);

  const user = useSelector((store) => {
    return store.user.user;
  });


  function handleCartToggle() {
    setCartIsOpen(!isCartOpen);
  }

  async function handleLogOut() {
    const response = await logout();
    dispatch(logoutUser());
    if (response.status === 200) {
      toast.warning("Logout Successfully");
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
              <span className="block text-sm">
                {user ? user.fname : "John"}
              </span>
              <span className="block truncate text-sm font-medium">
                {user ? user.email : "johnduo123@gmail.com"}
              </span>
            </Dropdown.Header>
            {dropdownLinks.map((link) => {
              return (
                <Dropdown.Item key={link.id}>
                  <Link to={link.url}>{link.name}</Link>
                </Dropdown.Item>
              );
            })}
            <Link to="/admin">
              <Dropdown.Item>Admin</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            {user ? (
              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            ) : null}
            {!user ? (
              <Link to="/login">
                <Dropdown.Item>Sign In</Dropdown.Item>
              </Link>
            ) : null}
          </Dropdown>

          <Link
            className="flex flex-col justify-center items-center "
            to="/wishlist">
            <FaRegHeart className="text-xl text-gray-600" />
            <span className="text-sm font-bold text-gray-700">Wishlist</span>
          </Link>
          <Link
            className="flex flex-col justify-center items-center "
            onClick={handleCartToggle}>
            <SlHandbag className="text-xl text-gray-600" />
            <span className="text-sm font-bold text-gray-700">Bag</span>
          </Link>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {pages.map((link, index) => {
            return (
              <Link className="text-base" key={link.id} to={link.slug}>
                <Navbar.Link href="#">{link.name}</Navbar.Link>
              </Link>
            );
          })}
        </Navbar.Collapse>
        <CartDrawer isOpen={isCartOpen} handleToggle={handleCartToggle} />
      </Navbar>
    </>
  );
}

export default NavUser;
