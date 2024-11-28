import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import proxy from "../../proxy";

const initialState = {
  productsData: [],
  itemList: [],
  userInfo: {},
  delieveryMsg : null,
  inputVal : ""
};

export const getProducts = createAsyncThunk("getProducts", async () => {
  const response = await fetch(`https://dummyjson.com/products?limit=96`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();
  return responseBody.products;
});

export const userAuthorize = createAsyncThunk("userAuthorize", async (token) => {
  const response = await fetch(`${proxy}/products/?token=${token}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  })

  const status = response.status;
  const responseBody = await response.json();
  return status;
})

export const saveDelieveryInfo = createAsyncThunk("saveDelieveryInfo" ,  async (data) => {
  const response = await fetch(`${proxy}/products/delievery`, {
    method :"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify(data)
  })
  const status = response.status;
  const responseBody = await response.json();
  return {responseBody , data, status}
})

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    addItemToList: (state, action) => {
      state.itemList = [...state.itemList, action.payload];
    },
    removeItemToList : (state, action) => {
      state.itemList = state.itemList.filter((item) => item.id !== action.payload)
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    addInputVal : (state , action) => {
      state.inputVal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsData = action.payload;
    });

    builder.addCase(saveDelieveryInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
    });


  },
});

export const { addItemToList, addUserInfo, removeItemToList, addInputVal } = homePageSlice.actions;

export default homePageSlice.reducer;
