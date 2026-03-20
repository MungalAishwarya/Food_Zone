// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import cuponReducer from "./CuponSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        cupon: cuponReducer,
    },
});

export default store;