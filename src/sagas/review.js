import { takeEvery, put, call } from "redux-saga/effects";
import * as reviewAction from "../reducers/review";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_NEWS_PER_PAGE } from "../constants/limitRecord";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const getReviewNewsesApi = (page, limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_REVIEW_NEWS
    }?_page=${page}&_limit=${limit}&_expand=movie`
  );

export function* getReviewNewses(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { page, limit } = action.payload;
    const response = yield call(getReviewNewsesApi, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        reviewAction.getReviewNewsesSuccess({
          reviewNewses: response.data,
          currentPage: page ? page : 1,
          totalPage: limit ? Math.ceil(totalRecords / LIMIT_NEWS_PER_PAGE) : 0,
        })
      );
    } else {
      yield put(reviewAction.getReviewNewsesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(reviewAction.getReviewNewsesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getDetailReviewApi = (id) =>
  axios.get(
    apiUrl.BASE_URL + apiUrl.API_REVIEW_NEWS + "/" + id + "?_expand=movie"
  );

export function* getDetailReview(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getDetailReviewApi, action.payload);
    if (response.statusText === "OK") {
      yield put(reviewAction.getDetailReviewSuccess(response.data));
    } else {
      yield put(reviewAction.getDetailReviewFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(reviewAction.getDetailReviewFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherReview() {
  yield takeEvery(reviewAction.getReviewNewses, getReviewNewses);
  yield takeEvery(reviewAction.getDetailReview, getDetailReview);
}
