import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemToList } from "../../redux/slices/homeSlice";

const Cart = () => {
  // Check if window is defined (client-side) before using useSelector

  const dispatch = useDispatch();
  const [allItemPrice, setAllItemPrice] = useState(0);
  const itemList = useSelector((state) => state.homePage.itemList);
  const [tempItemList, setTempItemList]  = useState([]);
  
  
  useEffect(() => {
    setTempItemList([...itemList])
  },[itemList])

  useEffect(() => {
    
    if (tempItemList.length > 0) {
      let totalPrices = 0;
      tempItemList.forEach((item) => {
        totalPrices += parseFloat(item.price);
      });

      setAllItemPrice(totalPrices);
    }
  }, [itemList, tempItemList]);

const handleRemoveItem = (id) => {
  const filteredItems = tempItemList.filter((card) => card.id !== id);
  dispatch(removeItemToList(id))
  setTempItemList(filteredItems)
}

  return (
    <div className={styles.cart}>
      <div className={styles.cartContainer}>
        <div className={styles.cartTitle}>Shopping Cart</div>
        {tempItemList.length <= 0 ? (
          <>
            <div style={{ fontSize: "2rem" }}>No item selected</div>
            <Link to = "/" style={{textDecoration : "none"}}>
            <button className={styles.itemBtn}>Browse Items</button>
            </Link>
          </>
        ) : (
          <div className={styles.itemMain}>
            {tempItemList?.map((item, index) => (
              <div className={styles.itemContainer} key={index}>
                <img
                  src={item.img}
                  alt="item"
                  className={styles.itemImg}
                />
                <div className={styles.infoContainer}>
                  <div className={styles.itemInfo}>{item.title}</div>
                  <div className={styles.itemInfo}>{item.description}</div>
                  <div className={styles.itemPrice}>₹ {item.price}</div>
                  <button className={styles.removeBtn} onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.allItmeInfo}>
        <div className={styles.allItmeInfoWrapper}>
          Subtotal ({tempItemList.length} Items) : ₹ {allItemPrice}
          <Link to="/checkout">
            <button className={styles.checkoutBtn}>Proceed to checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
