import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    pending: false,
    error: null,
  },
  reducers: {
    postFeedback: (state) => {
      state.pending = true;
      state.error = null;
    },
    postFeedbackSuccess: (state) => {
      state.pending = false;
      state.error = null;
    },
    postFeedbackFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  postFeedback,
  postFeedbackSuccess,
  postFeedbackFailed,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
