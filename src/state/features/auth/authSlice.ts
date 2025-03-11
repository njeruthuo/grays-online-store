import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { RootState } from "@/state/store/store";

interface initialStateTypes {
  isLoggedIn: boolean;
  token: string | null;
  superuser: boolean;
}

const initialState: initialStateTypes = {
  isLoggedIn: !!localStorage.getItem("grayAuthToken"),
  token: null,
  superuser: localStorage.getItem("grayStoreAdminStatus") === "true",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("grayAuthToken");
      state.isLoggedIn = false;
      state.token = null;
      state.superuser = false;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        const { token, superuser } = action.payload;
        localStorage.setItem("grayAuthToken", token);
        localStorage.setItem("grayStoreAdminStatus", superuser);
        state.token = token;
        state.isLoggedIn = true;
        state.superuser = true;
      }
    );
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
