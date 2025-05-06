import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/userLayout/UserLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WishlistPage from "./pages/WishlistPage";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserAuthGuard from "./guards/UserAuthGuard";
import LayoutUser from "./layout/userLayout/LayoutUser";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Address from "./pages/user/Address";
import LayoutAdmin from "./layout/adminLayout/LayoutAdmin";
import ProductsListAdmin from "./components/admin/productsListAdmin/ProductsListAdmin";
import AddUpdateProducts from "./components/admin/productsListAdmin/AddUpdateProducts";
import OrdersListAdmin from "./components/admin/ordersListAdmin/OrdersListAdmin";
import UsersListAdmin from "./components/admin/usersListAdmin/UsersListAdmin";
import AccountAdmin from "./components/admin/accountAdmin/AccountAdmin";
import DashboardAdmin from "./components/admin/dashboardAdmin/DashboardAdmin";
import PagesListAdmin from "./components/admin/pagesListAdmin/PagesListAdmin";
import AddUpdatePages from "./components/admin/pagesListAdmin/AddUpdatePages";
import { Flowbite } from "flowbite-react";
import Checkout from "./pages/Checkout";
import { fetchCart } from "./redux/slices/cartSlice";
import { useEffect } from "react";

function App() {
  const customTheme = {
    button: {
      color: {
        primary: "bg-[#2098e3] hover:bg-[#1f90bc] text-white ",
      },
    },
    sidebar: {
      item: {
        base: "h-full flex items-center justify-center rounded-md p-2 hover:bg-[#2098e3] hover:text-black-900 hover:text-white",
      },
    },
  };

  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [dispatch]);
  
  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path=":gender" element={<Home />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path=":gender/:category" element={<Product />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="checkout" element={<Checkout />} />
                <Route
                  path=":gender/:categories/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="user"
                  element={
                    <UserAuthGuard>
                      <LayoutUser />
                    </UserAuthGuard>
                  }>
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="address" element={<Address />} />
                </Route>
              </Route>
              {/* admin */}
              <Route
                path="/admin"
                element={
                  <UserAuthGuard>
                    <LayoutAdmin />
                  </UserAuthGuard>
                }>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="pages" element={<PagesListAdmin />} />
                <Route path="pages/:id" element={<AddUpdatePages />} />
                <Route path="products" element={<ProductsListAdmin />} />
                <Route path="products/:id" element={<AddUpdateProducts />} />
                <Route path="orders" element={<OrdersListAdmin />} />
                <Route path="users" element={<UsersListAdmin />} />
                <Route path="account" element={<AccountAdmin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </Flowbite>
    </>
  );
}

export default App;
