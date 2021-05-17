import { takeEvery, put, call } from "redux-saga/effects";
import * as feedbackAction from "../reducers/feedback";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const postFeedbackApi = (data) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_FEEDBACK, data);

export function* postFeedback(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(postFeedbackApi, action.payload);
    if (response.statusText === "Created") {
      yield put(feedbackAction.postFeedbackSuccess(response.data));
      toast.success(translation.notification?.send_feedback_success);
    } else {
      yield put(feedbackAction.postFeedbackFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(feedbackAction.postFeedbackFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherFeedback() {
  yield takeEvery(feedbackAction.postFeedback, postFeedback);
}
