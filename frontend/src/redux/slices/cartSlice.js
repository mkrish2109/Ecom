import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    subTotal: 0,
    tax: 0,
    taxRate: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const filteredCart = state.cart.filter((product) => {
        if (product.id === action.payload) {
          return false;
        }
        return true;
      });
      state.cart = filteredCart;
    },
    increaseQty: (state, action) => {},
    decreaseQty: (state, action) => {},
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

const cartSliceReducer = cartSlice.reducer;

console.log("addToCart", addToCart());

export default cartSliceReducer;
