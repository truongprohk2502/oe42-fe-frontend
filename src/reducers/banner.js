import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    pending: false,
    error: null,
  },
  reducers: {
    getBanners: (state) => {
      state.pending = true;
      state.error = null;
    },
    getBannersSuccess: (state, action) => {
      state.banners = action.payload;
      state.pending = false;
      state.error = null;
    },
    getBannersFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBanners,
  getBannersSuccess,
  getBannersFailed,
} = bannerSlice.actions;

export default bannerSlice.reducer;
