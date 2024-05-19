import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import Navbar from "../components/navbar/Navbar";
import HomePage from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import Payment from "../pages/payment/Payment";
import { Route, Routes, useLocation } from "react-router-dom";
import Checkout from "../pages/checkout/Checkout";
import LogIn from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const Layout = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
  setPathName(location.pathname)
  }, [location]);
    
  return (
    <div className={styles.layout}>
      {(pathName === "/signin" || pathName === "/signup" || pathName === null) ? (
          null
      ) : <Navbar />}
      <Routes>
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default Layout;
