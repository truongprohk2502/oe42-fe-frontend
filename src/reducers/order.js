import { createSlice } from "@reduxjs/toolkit";
import { ORDER_COUNTDOWN_SECONDS } from "../constants/common";
import { ORDER_PAGE_STATES } from "../constants/orderTicket";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentPage: 1,
    totalPage: 0,
    pageState: null,
    ticketTypes: [],
    pendingTicketTypes: false,
    errorTicketTypes: null,
    services: [],
    pendingServices: false,
    errorServices: null,
    countdown: ORDER_COUNTDOWN_SECONDS,
    selectedSeats: [],
    orderedData: {},
    pending: [],
    error: null,
  },
  reducers: {
    getTicketTypes: (state) => {
      state.pendingTicketTypes = true;
      state.errorTicketTypes = null;
    },
    getTicketTypesSuccess: (state, action) => {
      state.ticketTypes = action.payload;
      state.pendingTicketTypes = false;
      state.errorTicketTypes = null;
    },
    getTicketTypesFailed: (state, action) => {
      state.pendingTicketTypes = false;
      state.errorTicketTypes = action.payload;
    },
    getServices: (state) => {
      state.pendingServices = true;
      state.errorServices = null;
    },
    getServicesSuccess: (state, action) => {
      state.services = action.payload;
      state.pendingServices = false;
      state.errorServices = null;
    },
    getServicesFailed: (state, action) => {
      state.pendingServices = false;
      state.errorServices = action.payload;
    },
    runCountdown: (state, action) => {
      state.countdown = action.payload.countdown;
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    postOrder: (state) => {
      state.pending = true;
      state.error = null;
    },
    postOrderSuccess: (state, action) => {
      state.orderedData = action.payload;
      state.pending = false;
      state.error = null;
    },
    postOrderFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getAllOrders: (state) => {
      state.pending = true;
      state.error = null;
    },
    getAllOrdersSuccess: (state, action) => {
      const { orders, currentPage, totalPage } = action.payload;
      state.orders = orders;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getAllOrdersFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    resetOrder: (state) => {
      state.countdown = ORDER_COUNTDOWN_SECONDS;
      state.orderedData = {};
      state.ticketTypes = [];
      state.services = [];
      state.selectedSeats = [];
    },
    setPageState: (state, action) => {
      state.pageState = action.payload;
    },
    cancelOrder: (state) => {
      state.countdown = ORDER_COUNTDOWN_SECONDS;
      state.pageState = ORDER_PAGE_STATES.ORDER_SEAT;
    },
  },
});

export const {
  getTicketTypes,
  getTicketTypesSuccess,
  getTicketTypesFailed,
  getServices,
  getServicesSuccess,
  getServicesFailed,
  runCountdown,
  setCountdown,
  postOrder,
  postOrderSuccess,
  postOrderFailed,
  getAllOrders,
  getAllOrdersSuccess,
  getAllOrdersFailed,
  setSelectedSeats,
  resetOrder,
  setPageState,
  cancelOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
