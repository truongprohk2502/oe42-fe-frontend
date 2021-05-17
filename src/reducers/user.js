import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_USERS_PER_PAGE } from "../constants/limitRecord";
import { MANAGE_USER_PAGES } from "../constants/managePageState";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentPage: 1,
    totalPage: 0,
    totalUsers: 0,
    pageState: MANAGE_USER_PAGES.LIST_USERS,
    pending: false,
    error: null,
  },
  reducers: {
    getUsers: (state) => {
      state.pending = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      const { users, currentPage, totalPage, totalUsers } = action.payload;
      state.users = users;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.totalUsers = totalUsers;
      state.pending = false;
      state.error = null;
    },
    getUsersFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putActiveUser: (state) => {
      state.pending = true;
      state.error = null;
    },
    putActiveUserSuccess: (state, action) => {
      const { userId, isActive } = action.payload;
      state.users = state.users.map((user) => {
        if (user.id === userId) {
          user.isActive = isActive;
        }
        return user;
      });
      state.pending = false;
      state.error = null;
    },
    putActiveUserFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    postUser: (state) => {
      state.pending = true;
      state.error = null;
    },
    postUserSuccess: (state, action) => {
      const totalRecords = state.users.length;
      state.users =
        totalRecords < LIMIT_USERS_PER_PAGE
          ? [action.payload, ...state.users]
          : [action.payload, ...state.users.slice(0, totalRecords - 1)];
      state.currentPage = 1;
      state.totalPage = Math.ceil(
        (state.totalUsers + 1) / LIMIT_USERS_PER_PAGE
      );
      state.totalUsers++;
      state.pageState = MANAGE_USER_PAGES.LIST_USERS;
      state.pending = false;
      state.error = null;
    },
    postUserFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    setPageState: (state, action) => {
      state.pageState = action.payload;
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  putActiveUser,
  putActiveUserSuccess,
  putActiveUserFailed,
  postUser,
  postUserSuccess,
  postUserFailed,
  setPageState,
} = userSlice.actions;

export default userSlice.reducer;
