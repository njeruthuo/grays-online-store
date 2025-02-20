import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { RootState } from "@/state/store/store";

interface initialStateTypes {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: initialStateTypes = {
  isLoggedIn: !!localStorage.getItem("grayAuthToken"),
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("grayAuthToken");
      state.isLoggedIn = false;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        const { token } = action.payload;
        localStorage.setItem("grayAuthToken", token);
        state.token = token;
        state.isLoggedIn = true;
      }
    );
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
