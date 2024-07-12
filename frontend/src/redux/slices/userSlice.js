import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../services/apiServices";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async function (data) {
    return login(data);
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async function () {
    return logout();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")),
    error: "",
  },
  reducers: {
    // clearUser: (state, action) => {
    //   state.user = null;
    //   localStorage.removeItem("user");
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
      state.error = "";
      localStorage.setItem("user", JSON.stringify(action.payload.data));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(logoutUser.fulfilled, (state, error) => {
      state.user = null;
      localStorage.removeItem("user");
    });
  },
});

export const { clearUser } = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
