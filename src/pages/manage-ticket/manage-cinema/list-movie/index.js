import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Table } from "react-bootstrap";
import { getAllSchedules } from "../../../../reducers/schedule";
import { SCHEDULE_TYPE_ID } from "../../../../constants/common";
import { Link, useRouteMatch } from "react-router-dom";
import useCustomParams from "../../../../hooks/useCustomParams";
import { MANAGE_TICKET_PAGE_PATH } from "../../../../constants/routes";
import { getScreeningMovies } from "../../../../reducers/film";
import { useTranslation } from "react-i18next";

function ListMovie(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.film);
  const { selectedCinema } = useSelector((state) => state.cinema);
  const { schedulesByCinema: schedules } = useSelector(
    (state) => state.schedule
  );
  const { url } = useRouteMatch();
  const { cinemaId } = useCustomParams(MANAGE_TICKET_PAGE_PATH + "/:cinemaId");

  useEffect(() => {
    dispatch(getAllSchedules({ cinemaId, typeId: SCHEDULE_TYPE_ID.CINEMA }));
    dispatch(getScreeningMovies());
  }, [dispatch, cinemaId]);

  const getScreeningQuantity = (movieId, schedules) => {
    let qty = 0;
    schedules.forEach((schedule) => {
      schedule.movieId === movieId && qty++;
    });
    return qty;
  };

  return (
    <div>
      <div className="main-title">{selectedCinema.name}</div>
      <Table
        className="manage-list-movie-table"
        responsive
        striped
        bordered
        size="sm"
      >
        <thead>
          <tr>
            <th>{t("label.number_order")}</th>
            <th>{t("label.movie_name")}</th>
            <th>{t("label.published_date")}</th>
            <th>{t("label.schedule_quantity")}</th>
            <th>{t("label.detail")}</th>
          </tr>
        </thead>
        <tbody>
          {movies.length !== 0 &&
            movies.map((movie, index) => (
              <tr key={movie.id}>
                <td>{index + 1}</td>
                <td>{movie.name}</td>
                <td>{moment(movie.publishedDate).format("DD/MM/YYYY")}</td>
                <td>{getScreeningQuantity(movie.id, schedules)}</td>
                <td>
                  <Link to={url + "/" + movie.id}>
                    {t("label.show_detail")}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListMovie;
