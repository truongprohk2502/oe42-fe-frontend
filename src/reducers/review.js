import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewNewses: [],
    selectedReview: {},
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
  },
  reducers: {
    getReviewNewses: (state) => {
      state.pending = true;
      state.error = null;
    },
    getReviewNewsesSuccess: (state, action) => {
      const { reviewNewses, currentPage, totalPage } = action.payload;
      state.reviewNewses = reviewNewses;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getReviewNewsesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getDetailReview: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailReviewSuccess: (state, action) => {
      state.selectedReview = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailReviewFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    setMovieReview: (state, action) => {
      state.selectedReview = { ...state.selectedReview, movie: action.payload };
    },
  },
});

export const {
  getReviewNewses,
  getReviewNewsesSuccess,
  getReviewNewsesFailed,
  getDetailReview,
  getDetailReviewSuccess,
  getDetailReviewFailed,
  setMovieReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
