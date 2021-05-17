import { createSlice } from "@reduxjs/toolkit";

export const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cities: [],
    pendingCity: false,
    errorCity: null,
    cinemas: [],
    pendingCinema: false,
    errorCinema: null,
    selectedCinema: {},
    pending: false,
    error: null,
  },
  reducers: {
    getAllCities: (state) => {
      state.pendingCity = true;
      state.errorCity = null;
    },
    getAllCitiesSuccess: (state, action) => {
      state.cities = action.payload;
      state.pendingCity = false;
      state.errorCity = null;
    },
    getAllCitiesFailed: (state, action) => {
      state.pendingCity = false;
      state.errorCity = action.payload;
    },
    getAllCinemas: (state) => {
      state.pendingCinema = true;
      state.errorCinema = null;
    },
    getAllCinemasSuccess: (state, action) => {
      state.cinemas = action.payload;
      state.pendingCinema = false;
      state.errorCinema = null;
    },
    getAllCinemasFailed: (state, action) => {
      state.pendingCinema = false;
      state.errorCinema = action.payload;
    },
    getDetailCinema: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailCinemaSuccess: (state, action) => {
      state.selectedCinema = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailCinemaFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllCities,
  getAllCitiesSuccess,
  getAllCitiesFailed,
  getAllCinemas,
  getAllCinemasSuccess,
  getAllCinemasFailed,
  getDetailCinema,
  getDetailCinemaSuccess,
  getDetailCinemaFailed,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
