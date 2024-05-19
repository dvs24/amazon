"use client";
import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import img1 from '../../assets/banner.jpg'
import Cards from './components/cards/Cards';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/slices/homeSlice.js';

const HomePage = () => {

  const dispatch = useDispatch();

  const [currentPage ,  setCurrentPage] = useState(0); 
  

  useEffect(() => {
    dispatch(getProducts());

  },[])

  const handleNextPage = () => {
    if(currentPage < 7){
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePrevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage-1);
    }
  }

  return (
    <div className={styles.homePage}>
      <img src={img1} alt="Banner" className={styles.bannerImg}/>

      <div className={styles.cardsContainer}>
        <Cards currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
      </div>

      <div className={styles.btnWrapper}>
      <button className={styles.pageBtn} onClick={handlePrevPage} style={{display : `${currentPage === 0 ? "none" : "inline"}`}}>Prev</button>
      <label className={styles.pageNum}>{currentPage + 1}</label>
      <button className={styles.pageBtn} onClick={handleNextPage} style={{display : `${currentPage === 8 ? "none" : "inline"}`}}>Next</button>
      </div>
    </div>
  )
}

export default HomePage