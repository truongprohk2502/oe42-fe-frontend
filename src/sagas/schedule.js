import { takeEvery, put, call } from "redux-saga/effects";
import * as scheduleAction from "../reducers/schedule";
import * as orderAction from "../reducers/order";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";
import { setSelectedSeats } from "../reducers/order";
import { ORDER_PAGE_STATES } from "../constants/orderTicket";
import { ORDER_COUNTDOWN_SECONDS, SCHEDULE_TYPE_ID } from "../constants/common";

const getAllSchedulesByCinemaApi = (cinemaId, currentTime) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_SCHEDULE
    }?cinemaId=${cinemaId}&date_gte=${currentTime}&_expand=cinema&_sort=date&_order=asc`
  );

const getAllSchedulesByMovieApi = (cinemaId, movieId, currentTime) =>
  axios.get(
    `${apiUrl.BASE_URL + apiUrl.API_SCHEDULE}?movieId=${movieId}${
      cinemaId ? "&cinemaId=" + cinemaId : ""
    }&date_gte=${currentTime}&_expand=cinema&_expand=room&_sort=date&_order=asc`
  );

export function* getAllSchedules(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { cinemaId, movieId, typeId } = action.payload;
    const response =
      typeId === SCHEDULE_TYPE_ID.CINEMA
        ? yield call(getAllSchedulesByCinemaApi, cinemaId, Date.now())
        : typeId === SCHEDULE_TYPE_ID.MOVIE
        ? yield call(getAllSchedulesByMovieApi, cinemaId, movieId, Date.now())
        : null;
    if (response.statusText === "OK") {
      yield put(
        scheduleAction.getAllSchedulesSuccess({
          type: typeId,
          schedules: response.data,
        })
      );
    } else {
      yield put(scheduleAction.getAllSchedulesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.getAllSchedulesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getDetailScheduleApi = (scheduleId) =>
  axios.get(
    apiUrl.BASE_URL +
      apiUrl.API_SCHEDULE +
      "/" +
      scheduleId +
      "?_expand=cinema&_expand=movie&_expand=room"
  );

const getScheduleApi = (scheduleId) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_SCHEDULE + "/" + scheduleId);

export function* getDetailSchedule(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getDetailScheduleApi, action.payload);
    if (response.statusText === "OK") {
      const { data: schedule } = response;
      if (schedule.date >= Date.now()) {
        yield put(scheduleAction.getDetailScheduleSuccess(schedule));
        yield put(
          orderAction.setPageState(ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS)
        );
      } else {
        yield put(
          scheduleAction.getDetailScheduleFailed(
            translation.notification?.page_not_found
          )
        );
        yield put(orderAction.setPageState(ORDER_PAGE_STATES.NOT_FOUND));
        toast.error(translation.notification?.page_not_found);
      }
    } else {
      yield put(scheduleAction.getDetailScheduleFailed(errorMessage));
      yield put(orderAction.setPageState(ORDER_PAGE_STATES.NOT_FOUND));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.getDetailScheduleFailed(errorMessage));
    yield put(orderAction.setPageState(ORDER_PAGE_STATES.NOT_FOUND));
    toast.error(errorMessage);
  }
}

const postScheduleApi = (data) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_SCHEDULE, data);

export function* postSchedule(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { room, ...restProps } = action.payload;
    const response = yield call(postScheduleApi, {
      ...restProps,
      roomId: room.id,
    });
    if (response.statusText === "Created") {
      yield put(scheduleAction.postScheduleSuccess({ ...response.data, room }));
      toast.success(translation.notification?.add_schedule_success);
    } else {
      yield put(scheduleAction.postScheduleFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.postScheduleFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const putScheduleApi = (scheduleId, data) =>
  axios.put(apiUrl.BASE_URL + apiUrl.API_SCHEDULE + "/" + scheduleId, data);

export function* putSelectingSeats(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { scheduleId, userId, selectedSeats } = action.payload;
    const newSelectedSeats = [...selectedSeats];
    const responseGetSchedule = yield call(getDetailScheduleApi, scheduleId);
    if (responseGetSchedule.statusText === "OK") {
      const responseSeats = responseGetSchedule.data.roomSeats;
      const seats = Object.keys(responseSeats).reduce(
        (arr, key) => [...arr, ...responseSeats[key]],
        []
      );
      const seatArr = seats.map((item) => item.seat);
      let err = false;
      for (let i = 0; i < newSelectedSeats.length; i++) {
        if (seatArr.includes(newSelectedSeats[i])) {
          const index = seatArr.indexOf(newSelectedSeats[i]);
          if (seats[index].userId !== userId) {
            yield put(scheduleAction.getDetailSchedule(scheduleId));
            yield put(
              scheduleAction.putSelectingSeatsFailed(
                translation.error?.choose_selected_seat
              )
            );
            toast.error(translation.error?.choose_selected_seat);
            err = true;
            break;
          }
        }
      }
      if (!err) {
        for (let i = 0; i < newSelectedSeats.length; i++) {
          if (seatArr.includes(newSelectedSeats[i])) {
            newSelectedSeats.splice(i, 1);
          }
        }
        const { id, roomSeats, cinema, movie, room, ...restProps } =
          responseGetSchedule.data;
        const { isSelectingSeats, ...restSeatTypes } = roomSeats;
        const newScheduleData = {
          ...restProps,
          roomSeats: {
            ...restSeatTypes,
            isSelectingSeats: [
              ...isSelectingSeats,
              ...newSelectedSeats.map((item) => ({ seat: item, userId })),
            ],
          },
        };
        const responsePutSeats = yield call(
          putScheduleApi,
          id,
          newScheduleData
        );
        if (responsePutSeats.statusText === "OK") {
          yield put(
            scheduleAction.putSelectingSeatsSuccess({
              ...newScheduleData,
              id,
              cinema,
              movie,
              room,
            })
          );
          yield put(orderAction.setPageState(ORDER_PAGE_STATES.ORDER_PAYMENT));
          yield put(
            orderAction.runCountdown({
              timeLeft: ORDER_COUNTDOWN_SECONDS,
              scheduleId,
              selectedSeats,
            })
          );
        } else {
          yield put(scheduleAction.putSelectingSeatsFailed(errorMessage));
          toast.error(errorMessage);
        }
      }
    } else {
      yield put(scheduleAction.putSelectingSeatsFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.putSelectingSeatsFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* deleteSelectingSeats(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { scheduleId, selectedSeats } = action.payload;
    const responseGetSchedule = yield call(getDetailScheduleApi, scheduleId);
    if (responseGetSchedule.statusText === "OK") {
      const { id, cinema, movie, room, roomSeats, ...restProps } =
        responseGetSchedule.data;
      const { isSelectingSeats, ...restSeats } = roomSeats;
      const newRoomSeats = {
        ...restSeats,
        isSelectingSeats: isSelectingSeats.filter(
          (item) => !selectedSeats.includes(item.seat)
        ),
      };
      const responsePut = yield call(putScheduleApi, scheduleId, {
        ...restProps,
        roomSeats: newRoomSeats,
      });
      if (responsePut.statusText === "OK") {
        yield put(
          scheduleAction.deleteSelectingSeatsSuccess({
            ...restProps,
            id,
            cinema,
            movie,
            room,
            roomSeats: newRoomSeats,
          })
        );
        yield put(setSelectedSeats([]));
      } else {
        yield put(scheduleAction.deleteSelectingSeatsFailed(errorMessage));
        toast.error(errorMessage);
      }
    } else {
      yield put(scheduleAction.deleteSelectingSeatsFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.deleteSelectingSeatsFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* postSoldSeats(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { scheduleId, selectedSeats } = action.payload;
    const responseGetSchedule = yield call(getScheduleApi, scheduleId);
    if (responseGetSchedule.statusText === "OK") {
      const { id, roomSeats, ...restProps } = responseGetSchedule.data;
      const { soldSeats, isSelectingSeats, ...restSeats } = roomSeats;
      const selectedSeatArr = selectedSeats.map((item) => item.seat);
      const newRoomSeats = {
        ...restSeats,
        soldSeats: [...soldSeats, ...selectedSeats],
        isSelectingSeats: isSelectingSeats.filter(
          (item) => !selectedSeatArr.includes(item.seat)
        ),
      };
      const responsePut = yield call(putScheduleApi, scheduleId, {
        ...restProps,
        roomSeats: newRoomSeats,
      });
      if (responsePut.statusText === "OK") {
        yield put(scheduleAction.postSoldSeatsSuccess());
      } else {
        yield put(scheduleAction.postSoldSeatsFailed(errorMessage));
        toast.error(errorMessage);
      }
    } else {
      yield put(scheduleAction.postSoldSeatsFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.postSoldSeatsFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* putSeatByAdmin(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { selectedSchedule, seatData } = action.payload;
    const { id, roomSeats, room, movie, cinema, ...restProps } =
      selectedSchedule;
    const response = yield call(putScheduleApi, id, {
      ...restProps,
      roomSeats: seatData,
    });
    if (response.statusText === "OK") {
      yield put(
        scheduleAction.putSeatByAdminSuccess({
          ...selectedSchedule,
          roomSeats: seatData,
        })
      );
      toast.success(translation.notification?.updated_seat_status_success);
    } else {
      yield put(scheduleAction.putSeatByAdminFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(scheduleAction.putSeatByAdminFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherSchedule() {
  yield takeEvery(scheduleAction.getAllSchedules, getAllSchedules);
  yield takeEvery(scheduleAction.getDetailSchedule, getDetailSchedule);
  yield takeEvery(scheduleAction.postSchedule, postSchedule);
  yield takeEvery(scheduleAction.putSelectingSeats, putSelectingSeats);
  yield takeEvery(scheduleAction.deleteSelectingSeats, deleteSelectingSeats);
  yield takeEvery(scheduleAction.postSoldSeats, postSoldSeats);
  yield takeEvery(scheduleAction.putSeatByAdmin, putSeatByAdmin);
}
