import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import { useSelector } from "react-redux";

const Payment = () => {
  const [allItemPrice, setAllItemPrice] = useState();

  const itemList = useSelector((state) => state.homePage.itemList);
  const userInfo = useSelector(state => state.homePage.userInfo);

  useEffect(() => {
    if (itemList.length > 0) {
      let totalPrice = 0;
      itemList.forEach((item) => {
        totalPrice += parseFloat(item.price);
      });

      setAllItemPrice(totalPrice); 
    }
  }, [itemList]);

  return (
    <div className={styles.paymentPage}>
      <div className={styles.pageContainer}>
        <div className={styles.pageTitle}>Review Your Order</div>

        <div className={styles.addressSection}>
          <div className={styles.sectionName}>Shipping Address</div>
          <div className={styles.sectionInfo}>
            <div className={styles.fullName}>{userInfo.fullName}</div>
            <div>{userInfo.buildingInfo} {userInfo.landMark}</div>
            <div>{userInfo.area}</div>
            <div>{userInfo.city} {userInfo.state}</div>
          </div>
        </div>

        {/* <div className={styles.paymentSection}>
          <div className={styles.sectionName}>Payment Method</div>
          <div className={styles.sectionInfo}>
            <div className={styles.cardDetails}>Card Details</div>
            <div className={styles.cardInfo}>
              <input
                type="text"
                placeholder="Card Number"
                className={styles.cardAuth}
              />
              <div>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={styles.cardAuth}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className={styles.cardAuth}
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className={styles.cartContainer}>
          <div className={styles.cartTitle}>Your Order</div>
          <div className={styles.itemMain}>
            {itemList.map((item, index) => (
              <div className={styles.itemContainer} key={index}>
                <img
                  src={item.img}
                  alt="item"
                  className={styles.itemImg}
                />
                <div className={styles.infoContainer}>
                  <div className={styles.itemInfo}>{item.title}</div>
                  <div className={styles.itemDesc}>{item.description}</div>
                  <div className={styles.itemPrice}>₹ {item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.allItmeInfo}>
        <div className={styles.allItmeInfoWrapper}>
          Subtotal ({itemList.length} Items) : ₹ {allItemPrice}
          <button className={styles.checkoutBtn}>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
