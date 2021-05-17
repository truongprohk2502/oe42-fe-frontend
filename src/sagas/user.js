import { takeEvery, put, call } from "redux-saga/effects";
import * as userAction from "../reducers/user";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const getUsersApi = (page, limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_AUTH
    }?_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`
  );

export function* getUsers(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { page, limit } = action.payload;
    const response = yield call(getUsersApi, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        userAction.getUsersSuccess({
          users: response.data,
          currentPage: page,
          totalPage: Math.ceil(totalRecords / limit),
          totalUsers: +totalRecords,
        })
      );
    } else {
      yield put(userAction.getUsersFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(userAction.getUsersFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getUserApi = (id) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_AUTH + "/" + id);

const putUserApi = (id, data) =>
  axios.put(apiUrl.BASE_URL + apiUrl.API_AUTH + "/" + id, data);

export function* putActiveUser(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { userId, isActive } = action.payload;
    const responseGetUser = yield call(getUserApi, userId);
    if (responseGetUser.statusText === "OK") {
      const { id, ...restProps } = responseGetUser.data;
      const responsePutUser = yield call(putUserApi, userId, {
        ...restProps,
        isActive,
      });
      if (responsePutUser.statusText === "OK") {
        yield put(userAction.putActiveUserSuccess(action.payload));
        toast.success(
          isActive
            ? translation.notification?.activate_user_success
            : translation.notification?.block_user_success
        );
      } else {
        yield put(userAction.putActiveUserFailed(errorMessage));
        toast.error(errorMessage);
      }
    } else {
      yield put(userAction.putActiveUserFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(userAction.putActiveUserFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const postUserApi = (data) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_AUTH, data);

export function* postUser(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(postUserApi, action.payload);
    if (response.statusText === "Created") {
      yield put(userAction.postUserSuccess(response.data));
      toast.success(translation.notification?.add_user_success);
    } else {
      yield put(userAction.postUserFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(userAction.postUserFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherUser() {
  yield takeEvery(userAction.getUsers, getUsers);
  yield takeEvery(userAction.putActiveUser, putActiveUser);
  yield takeEvery(userAction.postUser, postUser);
}
