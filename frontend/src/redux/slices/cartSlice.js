import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCartAPI, getUserCart, updateCartQty,  removeFromCartAPI } from "../../services/apiServices"; // Added missing import
import { toast } from "react-toastify";

function calculateProductPriceImpact(product, isAdd, isCountChange) {
  const { price, taxRate, qty } = product;
  const taxAmount = (price * taxRate) / 100;
  const netProductPrice = price + taxAmount;
  const quantityToConsider = isCountChange ? 1 : qty;
  return netProductPrice * quantityToConsider * (isAdd ? 1 : -1);
}


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserCart();
      // console.log("Cart response", response);
      if (!response.success) {
        throw new Error("Failed to fetch cart");
      }
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      console.log("Adding to cart", product, quantity);
      const response = await addToCartAPI({
        productId: product._id,
        quantity
      });
      if (!response.success) {
        throw new Error("Failed to add to cart");
      }
      if (response.success){
        toast.success("Product added to cart");
      }
      return { product, quantity, apiResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItemAsync',
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      console.log("Updating cart item", productId, qty);
      if (qty <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      if(!productId) {
        throw new Error("Product ID is required");
      }
      const response = await updateCartQty(productId, qty);
      if (response.success){
        toast.success("Product quantity updated");
      }
      return { productId, qty, apiResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (productId, { rejectWithValue }) => {
    try {
      console.log("Removing from cart", productId);
      
      const response = await removeFromCartAPI(productId);
      if (!response.success) {
        throw new Error("Failed to remove from cart");
      }
      if (response.success){
        toast.success("Product removed from cart");
      }
      return { productId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    subTotal: 0,
    tax: 0,
    taxRate: 0,
    status: 'idle',
    error: null
  },
  // reducers: {
  //   addToCart: (state, action) => {
  //     const foundProduct = state.cart.find((value) => value._id === action.payload._id);

  //     if (foundProduct) {
  //       const updatedCart = state.cart.map((value) =>
  //         value._id === foundProduct._id
  //           ? { ...value, qty: value.qty + 1 }
  //           : value
  //       );
  //       state.cart = updatedCart;
  //     } else {
  //       state.cart.push(action.payload);
  //     }

  //     // Recalculate total and subtotal
  //     state.total = state.cart.reduce((total, product) => {
  //       return total + calculateProductPriceImpact(product, true, false);
  //     }, 0);
  //   },
  //   removeFromCart: (state, action) => {
  //     const filteredCart = state.cart.filter((product) => product._id !== action.payload);

  //     // Recalculate total and subtotal
  //     state.cart = filteredCart;
  //     state.total = state.cart.reduce((total, product) => {
  //       return total + calculateProductPriceImpact(product, true, false);
  //     }, 0);
  //   },
  //   increaseQty: (state, action) => {
  //     const updatedCart = state.cart.map((value) => {
  //       if (value._id === action.payload) {
  //         return { ...value, qty: value.qty + 1 };
  //       }
  //       return value;
  //     });

  //     state.cart = updatedCart;
  //     // Recalculate total and subtotal
  //     state.total = state.cart.reduce((total, product) => {
  //       return total + calculateProductPriceImpact(product, true, false);
  //     }, 0);
  //   },
  //   decreaseQty: (state, action) => {
  //     const updatedCart = state.cart.map((value) => {
  //       if (value._id === action.payload && value.qty > 1) {
  //         return { ...value, qty: value.qty - 1 };
  //       }
  //       return value;
  //     });

  //     state.cart = updatedCart;
  //     // Recalculate total and subtotal
  //     state.total = state.cart.reduce((total, product) => {
  //       return total + calculateProductPriceImpact(product, true, false);
  //     }, 0);
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartItems = action.payload.items || []; // Extract the items from the payload
        state.cart = cartItems.map(item => ({
          ...item.productId,  // Assuming each item has a `productId` object
          qty: item.quantity   // Assuming the item has a `quantity` field
        }));
        state.total = state.cart.reduce((total, product) => {
          return total + calculateProductPriceImpact(product, true, false); // Calculate total
        }, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;
        const foundProduct = state.cart.find((value) => value._id === product._id);

        if (foundProduct) {
          state.cart = state.cart.map((value) => 
            value._id === foundProduct._id 
              ? { ...value, qty: value.qty + quantity }
              : value
          );
        } else {
          state.cart.push({ ...product, qty: quantity });
        }

        // Recalculate total after adding item
        state.total = state.cart.reduce((sum, product) => 
          sum + calculateProductPriceImpact(product, true, false), 0);
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const { productId, qty } = action.payload;
        const product = state.cart.find(p => p._id === productId);

        if (product) {
          state.cart = state.cart.map(item =>
            item._id === productId ? { ...item, qty } : item
          );

          // Recalculate total after quantity update
          state.total = state.cart.reduce((sum, item) => 
            sum + calculateProductPriceImpact(item, true, false), 0);
        }
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { productId } = action.payload;
        const product = state.cart.find(p => p._id === productId);

        if (product) {
          state.cart = state.cart.filter(item => item._id !== productId);
          
          // Recalculate total after removing item
          state.total = state.cart.reduce((sum, item) => 
            sum + calculateProductPriceImpact(item, true, false), 0);
        }
      });
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
