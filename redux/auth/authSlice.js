import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { loginAdmin } from "@/services/auth";
import { fetchAstrologers } from "@/redux/astrologers/astrologerSlice";
import { clearToken, getToken, persistToken } from "@/utils/token";

export const login = createAsyncThunk("auth/login", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const data = await loginAdmin(credentials);
    const token = data?.accessToken || data?.token || data?.data?.accessToken;

    if (!token) {
      throw new Error("Login succeeded but no access token was returned.");
    }

    persistToken(token, credentials.remember);
    dispatch(fetchAstrologers());
    toast.success("Welcome back to APSRA Astro");
    return { remember: Boolean(credentials.remember) };
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || "Unable to login. Please check your credentials.";
    toast.error(message);
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    loading: false,
    error: null,
    remember: false
  },
  reducers: {
    hydrateAuthFromStorage(state) {
      state.isLoggedIn = Boolean(getToken());
    },
    logout(state) {
      clearToken();
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.remember = action.payload.remember;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  }
});

export const { hydrateAuthFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
