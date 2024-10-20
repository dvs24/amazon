import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/amazon_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/slices/userSlice";
import { toast, Toaster } from "react-hot-toast";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenEye, setIsOpenEye] = useState(false);

  const handleSignup = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const apiBody = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(signup(apiBody)).then((response) => {
      if (response.payload.status === 200) {
        toast.success(response.payload.responseBody.message, {
          duration: 5000,
          position: "top-right",
          style: {
            maxWidth: "35%",
          },
        });
        navigate("/signin");
      } else {
        toast.error(response.payload.responseBody.message, {
          duration: 5000,
          position: "top-right",
          style: {
            maxWidth: "35%",
          },
        });
      }
    });
  };

  return (
    <>
      <Toaster />
      <div className={styles.login}>
        <div className={styles.mainContainer}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          <div className={styles.loginWrapper}>
            <div className={styles.title}>Sign Up</div>

            <div className={styles.inputWrapper}>
              <div className={styles.inputField}>
                <div className={styles.labelText}>Name</div>
                <input type="text" placeholder="Enter your name" id="name" />
              </div>
              <div className={styles.inputField}>
                <div className={styles.labelText}>Email</div>
                <input type="text" placeholder="Enter your email" id="email" />
              </div>
              <div className={styles.inputField}>
                <div className={styles.labelText}>Password</div>
                <div className={styles.passWrapper}>
                  <input
                    type={isOpenEye ? "text" : "password"}
                    placeholder="Enter your passweord"
                    id="password"
                  />
                  {isOpenEye ? (
                    <img
                      src={openEye}
                      alt="open"
                      className={styles.eyeImg}
                      onClick={() => setIsOpenEye(!isOpenEye)}
                    />
                  ) : (
                    <img
                      src={closeEye}
                      alt="close"
                      className={styles.eyeImg}
                      onClick={() => setIsOpenEye(!isOpenEye)}
                    />
                  )}
                </div>
              </div>
            </div>

            <button className={styles.loginBtn} onClick={handleSignup}>
              SignUp
            </button>

            <div className={styles.info}>
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice
            </div>
          </div>
          <button
            className={styles.registerBtn}
            onClick={() => navigate("/signin")}
          >
            Already account? Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
