import { takeEvery, put, call } from "redux-saga/effects";
import * as cinemaAction from "../reducers/cinema";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const getAllCitiesApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_CITY);

export function* getAllCities() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getAllCitiesApi);
    if (response.statusText === "OK") {
      yield put(cinemaAction.getAllCitiesSuccess(response.data));
    } else {
      yield put(cinemaAction.getAllCitiesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getAllCitiesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getAllCinemasApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_CINEMA + "?_expand=city");

export function* getAllCinemas() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getAllCinemasApi);
    if (response.statusText === "OK") {
      yield put(cinemaAction.getAllCinemasSuccess(response.data));
    } else {
      yield put(cinemaAction.getAllCinemasFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getAllCinemasFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getDetailCinemaApi = (id) =>
  axios.get(`${apiUrl.BASE_URL + apiUrl.API_CINEMA}/${id}?_expand=city&_embed=rooms`);

export function* getDetailCinema(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getDetailCinemaApi, action.payload);
    if (response.statusText === "OK") {
      yield put(cinemaAction.getDetailCinemaSuccess(response.data));
    } else {
      yield put(cinemaAction.getDetailCinemaFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getDetailCinemaFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherCinema() {
  yield takeEvery(cinemaAction.getAllCities, getAllCities);
  yield takeEvery(cinemaAction.getAllCinemas, getAllCinemas);
  yield takeEvery(cinemaAction.getDetailCinema, getDetailCinema);
}
