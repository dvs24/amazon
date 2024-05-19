import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "../redux/slices/homeSlice"
import userReducer from "./slices/userSlice";

 export const store = configureStore({
    reducer : {
        homePage : homePageReducer,
        user : userReducer
    }
 })