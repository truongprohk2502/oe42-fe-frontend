import { createSlice } from "@reduxjs/toolkit";
import { SCHEDULE_TYPE_ID } from "../constants/common";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    selectedSchedule: {},
    schedulesByCinema: [],
    schedulesByMovie: [],
    pendingSchedule: false,
    errorSchedule: null,
    pendingSeat: false,
    errorSeat: null,
  },
  reducers: {
    getAllSchedules: (state) => {
      state.pendingSchedule = true;
      state.errorSchedule = null;
    },
    getAllSchedulesSuccess: (state, action) => {
      const { type, schedules } = action.payload;
      if (type === SCHEDULE_TYPE_ID.MOVIE) {
        state.schedulesByMovie = schedules;
      } else if (type === SCHEDULE_TYPE_ID.CINEMA) {
        state.schedulesByCinema = schedules;
      }
      state.pendingSchedule = false;
      state.errorSchedule = null;
    },
    getAllSchedulesFailed: (state, action) => {
      state.pendingSchedule = false;
      state.errorSchedule = action.payload;
    },
    getDetailSchedule: (state) => {
      state.pendingSchedule = true;
      state.errorSchedule = null;
    },
    getDetailScheduleSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSchedule = false;
      state.errorSchedule = null;
    },
    getDetailScheduleFailed: (state, action) => {
      state.pendingSchedule = false;
      state.errorSchedule = action.payload;
    },
    postSchedule: (state) => {
      state.pendingSchedule = true;
      state.errorSchedule = null;
    },
    postScheduleSuccess: (state, action) => {
      state.schedulesByMovie = [...state.schedulesByMovie, action.payload].sort(
        (a, b) => a.date - b.date
      );
      state.pendingSchedule = false;
      state.errorSchedule = null;
    },
    postScheduleFailed: (state, action) => {
      state.pendingSchedule = false;
      state.errorSchedule = action.payload;
    },
    putSelectingSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    putSelectingSeatsSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    putSelectingSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
    deleteSelectingSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    deleteSelectingSeatsSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    deleteSelectingSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
    postSoldSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    postSoldSeatsSuccess: (state) => {
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    postSoldSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
    putSeatByAdmin: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    putSeatByAdminSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    putSeatByAdminFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
  },
});

export const {
  getAllSchedules,
  getAllSchedulesSuccess,
  getAllSchedulesFailed,
  getDetailSchedule,
  getDetailScheduleSuccess,
  getDetailScheduleFailed,
  postSchedule,
  postScheduleSuccess,
  postScheduleFailed,
  putSelectingSeats,
  putSelectingSeatsSuccess,
  putSelectingSeatsFailed,
  deleteSelectingSeats,
  deleteSelectingSeatsSuccess,
  deleteSelectingSeatsFailed,
  postSoldSeats,
  postSoldSeatsSuccess,
  postSoldSeatsFailed,
  putSeatByAdmin,
  putSeatByAdminSuccess,
  putSeatByAdminFailed,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
