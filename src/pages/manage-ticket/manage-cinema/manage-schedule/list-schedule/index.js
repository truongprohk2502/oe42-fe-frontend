import React, { useEffect, useState } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import useCustomParams from "../../../../../hooks/useCustomParams";
import { MANAGE_TICKET_PAGE_PATH } from "../../../../../constants/routes";
import moment from "moment";
import Schedule from "../../../../../components/schedule";
import {
  getAllSchedules,
  postSchedule,
} from "../../../../../reducers/schedule";
import { SCHEDULE_TYPE_ID } from "../../../../../constants/common";
import { useRouteMatch } from "react-router-dom";
import { Field, Formik } from "formik";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import addScheduleSchema from "../../../../../validations/addScheduleSchema";

function ListSchedule(props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedCinema } = useSelector((state) => state.cinema);
  const { movies } = useSelector((state) => state.film);
  const { schedulesByMovie: schedules } = useSelector(
    (state) => state.schedule
  );
  const { movieId, cinemaId } = useCustomParams(
    MANAGE_TICKET_PAGE_PATH + "/:cinemaId/:movieId"
  );

  useEffect(() => {
    dispatch(
      getAllSchedules({ movieId, cinemaId, typeId: SCHEDULE_TYPE_ID.MOVIE })
    );
  }, [dispatch, movieId, cinemaId]);

  const getTitle = (cinemaName, movieId, movies) => {
    const movie = movies.find((movie) => movie.id === movieId);
    return movie ? cinemaName + " - " + movie.name : cinemaName;
  };

  const groupSchedules = (schedules) => {
    const dateArr = [];
    return schedules.reduce((group, schedule) => {
      const { id, date, room } = schedule;
      const addSchedule = { id, date, room };
      const dateFormat = moment(date).format("DD/MM/YYYY");
      if (dateArr.includes(dateFormat)) {
        return group.map((groupItem) => {
          if (groupItem.date === dateFormat) {
            groupItem.schedules = [...groupItem.schedules, addSchedule];
          }
          return groupItem;
        });
      } else {
        const groupId = dateArr.length + 1;
        dateArr.push(dateFormat);
        return [
          ...group,
          {
            id: groupId,
            date: dateFormat,
            schedules: [addSchedule],
          },
        ];
      }
    }, []);
  };

  return (
    <div className="list-schedule-container">
      <div className="main-title">
        {getTitle(selectedCinema.name, +movieId, movies)}
      </div>
      <button className="add-btn" onClick={() => setShowAddForm(true)}>
        {t("common.button_title.add_schedule")}
      </button>
      {showAddForm && (
        <Formik
          initialValues={{
            room: "",
            date: "",
            time: "",
          }}
          validationSchema={addScheduleSchema}
          onSubmit={(values) => {
            const { room, date, time } = values;
            dispatch(
              postSchedule({
                room: selectedCinema.rooms?.find(
                  (roomItem) => roomItem.id === +room
                ),
                movieId: +movieId,
                cinemaId: +cinemaId,
                roomSeats: {
                  isSelectingSeats: [],
                  soldSeats: [],
                  unselectableSeats: [],
                },
                date: moment(date + ", " + time, "YYYY-MM-DD, HH:mm").valueOf(),
              })
            );
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form>
              <Field name="room">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="room">{t("label.choose_room")}</label>
                    <select id="room" {...field}>
                      <option value="" disabled>
                        - - - - -
                      </option>
                      {selectedCinema.rooms?.length &&
                        selectedCinema.rooms?.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </Field>
              {errors.room && touched.room ? (
                <span>{t(errors.room)}</span>
              ) : null}
              <Field name="date">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="date">{t("label.choose_date")}</label>
                    <input id="date" type="date" {...field} />
                  </div>
                )}
              </Field>
              {errors.date && touched.date ? (
                <span>{t(errors.date)}</span>
              ) : null}
              <Field name="time">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="time">{t("label.choose_hour")}</label>
                    <input id="time" type="time" {...field} />
                  </div>
                )}
              </Field>
              {errors.time && touched.time ? (
                <span>{t(errors.time)}</span>
              ) : null}
              <div className="button-group">
                <button type="button" onClick={handleSubmit}>
                  {t("common.button_title.add")}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  {t("common.button_title.cancel")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {schedules.length !== 0 &&
        groupSchedules(schedules).map((group) => (
          <Schedule
            key={group.id}
            path={url}
            name={group.date}
            schedules={group.schedules}
          />
        ))}
    </div>
  );
}

export default ListSchedule;
