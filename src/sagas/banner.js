import { takeEvery, put, call } from "redux-saga/effects";
import * as bannerAction from "../reducers/banner";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const getBannersApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_BANNER);

export function* getBanners() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getBannersApi);
    if (response.statusText === "OK") {
      yield put(bannerAction.getBannersSuccess(response.data));
    } else {
      yield put(bannerAction.getBannersFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(bannerAction.getBannersFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherBanner() {
  yield takeEvery(bannerAction.getBanners, getBanners);
}
