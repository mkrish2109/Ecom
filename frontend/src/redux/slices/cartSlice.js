import { createSlice } from "@reduxjs/toolkit";

function getTotal(total, product, isAdd, isCountChange) {
  const { price, taxRate, qty } = product;
  const taxAmount = (price * taxRate) / 100;
  const netProductPrice = price + taxAmount;
  const totalPrice = netProductPrice * (isCountChange ? 1 : qty);
  if (isAdd) {
    return Number((total + totalPrice).toFixed(2));
  } else {
    return Number((total - totalPrice).toFixed(2));
  }
}
function getSubTotal(subTotal, product, isAdd, isCountChange) {
  const { price, taxRate, qty } = product;
  const taxAmount = (price * taxRate) / 100;
  const netProductPrice = price + taxAmount;
  const totalPrice = netProductPrice * (isCountChange ? 1 : qty);
  if (isAdd) {
    return Number((subTotal + totalPrice).toFixed(2));
  } else {
    return Number((subTotal - totalPrice).toFixed(2));
  }
}
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
 
      const foundProduct = state.cart.find((value) => {
        if (value._id === action.payload._id) {
          return true;
        }
        return false;
      });

      if (foundProduct) {
        const updatedCart = state.cart.map((value) => {
          if (value._id === foundProduct._id) {
            return { ...value, qty: value.qty + 1 };
          }
          return value;
        });
        state.cart = updatedCart;
      } else {
        state.cart.push(action.payload);
      }
      state.total = getTotal(state.total, action.payload, true);
    },
    removeFromCart: (state, action) => {
      const filteredCart = state.cart.filter((product) => {
        if (product._id === action.payload) {
          state.total = getTotal(state.total, product, false);
          return false;
        }
        return true;
      });
      state.cart = filteredCart;
    },
    increaseQty: (state, action) => {
      const updatedCart = state.cart.map((value) => {
        if (value._id === action.payload) {
          state.total = getTotal(state.total, value, true, true);
          state.subTotal = getSubTotal(state.subTotal, value, true, true);
          return { ...value, qty: value.qty + 1 };
        }
        return value;
      });
      state.cart = updatedCart;
    },
    decreaseQty: (state, action) => {
      const updatedCart = state.cart.map((value) => {
        if (value._id === action.payload) {
          if (value.qty > 1) {
            state.total = getTotal(state.total, value, false, true);
            state.subTotal = getSubTotal(state.subTotal, value, false, true);
            return { ...value, qty: value.qty - 1 };
          }
          return value;
        }
        return value;
      });
      state.cart = updatedCart;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

const cartSliceReducer = cartSlice.reducer;

export default cartSliceReducer;
