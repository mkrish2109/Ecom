import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/userLayout/UserLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path=":gender/:categories" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
