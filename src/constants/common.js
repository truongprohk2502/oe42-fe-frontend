import { ORDER_PAGE_STATES } from "./orderTicket";

export const ORDER_COUNTDOWN_SECONDS = 120;
export const TOKEN_LENGTH = 15;

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const MOVIE_STATUSES = {
  CANCELLED: "CANCELLED",
  PLAYING: "PLAYING",
  ONGOING: "ONGOING",
};

export const SCHEDULE_TYPE_ID = {
  MOVIE: "movieId",
  CINEMA: "cinemaId",
};

export const ORDER_PROGRESSES = {
  TICKET_AND_SERVICES: {
    name: "tickets_and_services",
    pageState: ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS,
  },
  CHOOSE_SEATS: {
    name: "choose_seats",
    pageState: ORDER_PAGE_STATES.ORDER_SEAT,
  },
  PAYMENT: {
    name: "payment",
    pageState: ORDER_PAGE_STATES.ORDER_PAYMENT,
  },
};
