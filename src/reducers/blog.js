import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogNewses: [],
    selectedBlog: {},
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
  },
  reducers: {
    getBlogNewses: (state) => {
      state.pending = true;
      state.error = null;
    },
    getBlogNewsesSuccess: (state, action) => {
      const { blogNewses, currentPage, totalPage } = action.payload;
      state.blogNewses = blogNewses;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getBlogNewsesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getDetailBlog: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailBlogSuccess: (state, action) => {
      state.selectedBlog = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailBlogFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBlogNewses,
  getBlogNewsesSuccess,
  getBlogNewsesFailed,
  getDetailBlog,
  getDetailBlogSuccess,
  getDetailBlogFailed,
} = blogSlice.actions;

export default blogSlice.reducer;
