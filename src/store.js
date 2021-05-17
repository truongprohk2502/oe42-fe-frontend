import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import watcherSaga from "./sagas";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import bannerReducer from "./reducers/banner";
import promotionReducer from "./reducers/promotion";
import reviewReducer from "./reducers/review";
import blogReducer from "./reducers/blog";
import filmReducer from "./reducers/film";
import authReducer from "./reducers/auth";
import cinemaReducer from "./reducers/cinema";
import orderReducer from "./reducers/order";
import scheduleReducer from "./reducers/schedule";
import feedbackReducer from "./reducers/feedback";
import userReducer from "./reducers/user";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  banner: bannerReducer,
  promotion: promotionReducer,
  review: reviewReducer,
  blog: blogReducer,
  film: filmReducer,
  auth: authReducer,
  cinema: cinemaReducer,
  order: orderReducer,
  schedule: scheduleReducer,
  feedback: feedbackReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    logger,
  ],
});

sagaMiddleware.run(watcherSaga);

export default store;
