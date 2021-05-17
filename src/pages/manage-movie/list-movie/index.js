import React, { useEffect, useState } from "react";
import "./style.sass";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../../components/pagination";
import { getAverageRating } from "../../../utils/getAverageRating";
import {
  getFilterMovies,
  getMovies,
  getSearchMovies,
} from "../../../reducers/film";
import { LIMIT_MOVIES_PER_PAGE } from "../../../constants/limitRecord";
import * as routePath from "../../../constants/routes";
import { MOVIE_STATUSES } from "../../../constants/common";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { YOUTUBE_URL } from "../../../constants/apiUrl";

function ListMovie(props) {
  const [keyword, setKeyword] = useState("");
  const [movieState, setMovieState] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { movies, currentPage, totalPage } = useSelector((state) => state.film);

  useEffect(() => {
    dispatch(getMovies({ page: 1, limit: LIMIT_MOVIES_PER_PAGE }));
  }, [dispatch]);

  const handleAddButton = () => {
    history.push(
      routePath.MANAGE_MOVIE_PAGE_PATH + routePath.ADD_MOVIE_PAGE_URI
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovieState("");
    dispatch(
      keyword.trim().length
        ? getSearchMovies({ keyword, page: 1, limit: LIMIT_MOVIES_PER_PAGE })
        : getMovies({ page: 1, limit: LIMIT_MOVIES_PER_PAGE })
    );
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMovieState(value);
    setKeyword("");
    dispatch(
      value.length
        ? getFilterMovies({
            page: 1,
            limit: LIMIT_MOVIES_PER_PAGE,
            status: value,
          })
        : getMovies({ page: 1, limit: LIMIT_MOVIES_PER_PAGE })
    );
  };

  return (
    <section className="list-movie-container">
      <div className="action-container">
        <button className="add-btn" onClick={handleAddButton}>
          {t("common.button_title.add_movie")}
        </button>
        <div className="filter-group">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t("header.top_header.search_placeholder")}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="select-item">
            <span>{t("label.status") + ": "}</span>
            <select value={movieState} onChange={handleChange}>
              <option value="">{t("select_option.all")}</option>
              <option value={MOVIE_STATUSES.CANCELLED}>
                {t("select_option.cancelled")}
              </option>
              <option value={MOVIE_STATUSES.PLAYING}>
                {t("select_option.playing")}
              </option>
              <option value={MOVIE_STATUSES.ONGOING}>
                {t("select_option.ongoing")}
              </option>
            </select>
          </div>
        </div>
      </div>
      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th className="sm-col">{t("label.number_order")}</th>
            <th className="lg-col">{t("movie_title.name")}</th>
            <th className="sm-col">{t("movie_title.image")}</th>
            <th className="lg-col">{t("movie_title.trailer")}</th>
            <th className="lg-col">{t("movie_title.summary")}</th>
            <th className="md-col">{t("movie_title.runtime")}</th>
            <th className="md-col">{t("movie_title.category")}</th>
            <th className="md-col">{t("movie_title.nation")}</th>
            <th className="md-col">{t("movie_title.producer")}</th>
            <th className="md-col">{t("movie_title.director")}</th>
            <th className="lg-col">{t("movie_title.actors")}</th>
            <th className="md-col">{t("movie_title.published_date")}</th>
            <th className="md-col">{t("movie_title.rating")}</th>
            <th className="md-col">{t("movie_title.status")}</th>
            <th className="md-col">{t("label.action")}</th>
          </tr>
        </thead>
        <tbody>
          {movies.length !== 0 &&
            movies.map((movie, index) => (
              <tr key={movie.id}>
                <td>{index + 1}</td>
                <td>{movie.name}</td>
                <td>
                  <img src={movie.img} alt={movie.name} />
                </td>
                <td>
                  <a href={YOUTUBE_URL + movie.trailer}>
                    {YOUTUBE_URL + movie.trailer}
                  </a>
                </td>
                <td className="limit-row">{movie.summary}</td>
                <td>{movie.timeByMinutes + " minutes"}</td>
                <td>{movie.category}</td>
                <td>{movie.nation}</td>
                <td>{movie.producer}</td>
                <td>{movie.director}</td>
                <td>{movie.actors.join(", ")}</td>
                <td>{moment(movie.publishedDate).format("DD/MM/YYYY")}</td>
                <td>
                  {movie.ratings?.length ? getAverageRating(movie.ratings) : 0}
                </td>
                <td>
                  {movie.status === MOVIE_STATUSES.CANCELLED
                    ? t("movie_status.cancelled")
                    : movie.status === MOVIE_STATUSES.PLAYING
                    ? t("movie_status.playing")
                    : movie.status === MOVIE_STATUSES.ONGOING
                    ? t("movie_status.ongoing")
                    : null}
                </td>
                <td>
                  <Link
                    to={routePath.MANAGE_MOVIE_PAGE_PATH + "/" + movie.id}
                    className="btn"
                  >
                    <i className="fa fa-trash"></i>&nbsp;
                    {t("common.button_title.edit")}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        totalPage={totalPage}
        action={getMovies}
        limitRecords={LIMIT_MOVIES_PER_PAGE}
      />
    </section>
  );
}

export default ListMovie;
