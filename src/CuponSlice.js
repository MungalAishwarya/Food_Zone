// CuponSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cuponSlice = createSlice({
    name: "cupon",
    initialState: {
        code: "",
        discount: 0,
        applied: false,
        message: ""
    },
    reducers: {
        applyCupon: (state, action) => {
            const cuponCode = action.payload;

            // Coupon logic
            if (cuponCode === "FESTIVE25") {
                state.code = cuponCode;
                state.discount = 25;
                state.applied = true;
                state.message = "Coupon applied: FESTIVE25 (25% off)";
            } else if (cuponCode === "SAVE10") {
                state.code = cuponCode;
                state.discount = 10;
                state.applied = true;
                state.message = "Coupon applied: SAVE10 (10% off)";
            } else if (cuponCode === "SAVE20") {
                state.code = cuponCode;
                state.discount = 20;
                state.applied = true;
                state.message = "Coupon applied: SAVE20 (20% off)";
            } else if (cuponCode === "WELCOME") {
                state.code = cuponCode;
                state.discount = 5;
                state.applied = true;
                state.message = "Coupon applied: WELCOME (5% off)";
            } else {
                state.code = "";
                state.discount = 0;
                state.applied = false;
                state.message = "Invalid coupon code";
            }
        },
        resetCupon: (state) => {
            state.code = "";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        }
    }
});

export const { applyCupon, resetCupon } = cuponSlice.actions;
export default cuponSlice.reducer;