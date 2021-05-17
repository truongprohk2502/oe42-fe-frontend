import { createSlice } from "@reduxjs/toolkit";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    selectedPromotion: {},
    promotions: [],
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
  },
  reducers: {
    getPromotions: (state) => {
      state.pending = true;
      state.error = null;
    },
    getPromotionsSuccess: (state, action) => {
      const { promotions, currentPage, totalPage } = action.payload;
      state.promotions = promotions;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getPromotionsFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getDetailPromotion: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailPromotionSuccess: (state, action) => {
      state.selectedPromotion = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailPromotionFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPromotions,
  getPromotionsSuccess,
  getPromotionsFailed,
  getDetailPromotion,
  getDetailPromotionSuccess,
  getDetailPromotionFailed,
} = promotionSlice.actions;

export default promotionSlice.reducer;
