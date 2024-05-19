import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import cart from "../../assets/cartIcon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const itemList = useSelector((state) => state.homePage.itemList);

  const handleCartIcon = () => {};

  return (
    <div className={styles.navBar}>
      <Link to="/">
        <button className={styles.logoImg}>
          <img src={logo} alt="" className={styles.logoTag}/>
        </button>
      </Link>

      <div className={styles.textWrapper}>
        <div className={styles.deliveryText}>Delivery</div>
        <div className={styles.country}>India</div>
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Products"
        />
        <button className={styles.searchBtn}>search</button>
      </div>

      <div className={styles.textWrapper}>
        <div className={styles.signInText}>Hello Sign in</div>
        <div className={styles.AccList}>Accounts & Lists</div>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.markedText}>Marked</div>
        <div className={styles.favouritesText}>& Favourites</div>
      </div>

      <div className={styles.cartWrapper}>
        <Link to="/cart">
          <img src={cart} width={30} height={20} alt="" />
          <div className={styles.cartText}>cart</div>
        </Link>
         {itemList.length > 0 && (
          <div className={styles.cartNum}>{itemList?.length}</div>
        )} 
      </div>
    </div>
  );
};

export default Navbar;
