import React, { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToList } from "../../../../redux/slices/homeSlice.js";

const Cards = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.homePage.productsData);
  const itemList = useSelector((state) => state.homePage.itemList);

  const [allProducts, setAllProducts] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    if (productsData.length > 0) {
      setAllProducts(productsData.slice(0, 12));
    }
  }, [productsData]);

  useEffect(() => {
    if (productsData.length > 0) {
      setAllProducts(productsData.slice(currentPage * 12, currentPage * 12 + 12));
    }
  }, [currentPage, productsData]);

  useEffect(() => {
    const disabled = {};
    itemList.forEach(item => {
      disabled[item.id] = true;
    });
    setDisabledButtons(disabled);
  }, [itemList]);

  const handleAddCartItem = (card) => {
    const itemData = {
      id: card.id,
      img: card.images[0],
      description: card.description,
      title: card.title,
      price: card.price,
    };

    dispatch(addItemToList(itemData));
    setDisabledButtons(prev => ({ ...prev, [card.id]: true }));
  };

  return (
    <div className={styles.cards}>
      {allProducts?.length > 0 ? (
        allProducts?.map((card, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.imgDiv}>
              <img
                src={card.images[0]}
                alt="CardImage"
                className={styles.cardImg}
              />
            </div>
            <div className={styles.title}>{card.title}</div>
            <div className={styles.desc}>{card.description}</div>
            <div className={styles.cardInfo}>
              <div className={styles.price}>₹{card.price}</div>
              <div className={styles.rating}>Rating:{card.rating}</div>
            </div>
            <button
              className={styles.cardbtn}
              onClick={() => handleAddCartItem(card)}
              disabled={disabledButtons[card.id]}
            >
              {disabledButtons[card.id] ? "Added" : "Add to cart"}
            </button>
          </div>
        ))
      ) : (
        <div style={{ fontSize: "2rem", textAlign: "center", width: "100vw", marginBottom: '3rem' }}>
          Loading Products...
        </div>
      )}
    </div>
  );
};

export default Cards;
