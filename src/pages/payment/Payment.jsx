import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { emptyItemlist } from "../../redux/slices/homeSlice";

const Payment = () => {
  const [allItemPrice, setAllItemPrice] = useState();

  const itemList = useSelector((state) => state.homePage.itemList);
  const userInfo = useSelector((state) => state.homePage.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialOptions = {
    "client-id":
      "AXwot2emYOOEK_vFgzXBKgUCs2jgMk0PWNZG4bq9yFuxawHvOoC3Mk2kfsy2q3sUxDrv9O6JaH3wMEek",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    if (itemList.length > 0) {
      let totalPrice = 0;
      itemList.forEach((item) => {
        totalPrice += parseFloat(item.price);
      });

      setAllItemPrice(totalPrice);
    }
  }, [itemList]);

  const handleSucessfullPayment = async (details) => {
    dispatch(emptyItemlist());
    navigate("/");
    alert(`Transaction completed by ${details.payer.name.given_name}`);
  };

  return (
    <div className={styles.paymentPage}>
      <div className={styles.pageContainer}>
        <div className={styles.pageTitle}>Review Your Order</div>

        <div className={styles.addressSection}>
          <div className={styles.sectionName}>Shipping Address</div>
          <div className={styles.sectionInfo}>
            <div className={styles.fullName}>{userInfo.fullName}</div>
            <div>
              {userInfo.buildingInfo} {userInfo.landMark}
            </div>
            <div>{userInfo.area}</div>
            <div>
              {userInfo.city} {userInfo.state}
            </div>
          </div>
        </div>

        <div className={styles.cartContainer}>
          <div className={styles.cartTitle}>Your Order</div>
          <div className={styles.itemMain}>
            {itemList.map((item, index) => (
              <div className={styles.itemContainer} key={index}>
                <img src={item.img} alt="item" className={styles.itemImg} />
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
          <PayPalScriptProvider options={initialOptions}>
            <div>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: "Signup Payment Plan",
                        amount: { value: `${allItemPrice}` }, // Replace with your price
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleSucessfullPayment(details);

                    console.log("Transaction Details:", details);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  alert("Payment failed. Please try again.");
                }}
              />
            </div>
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Payment;
