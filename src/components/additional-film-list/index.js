import React from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FILM_PAGE_PATH } from "../../constants/routes";
import PropTypes from "prop-types";

function AdditionalFilmList({ movies }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="sub-content-title">
        {t("common.list_title.playing_movie")}
      </div>
      {movies.length &&
        movies.map((movie) => (
          <article className="movie-item" key={movie.id}>
            <div className="img-container">
              <img src={movie.img} alt={movie.name} />
              <div className="action-container">
                <Link to={FILM_PAGE_PATH + "/" + movie.id}>
                  {t("common.button_title.order_ticket")}
                </Link>
              </div>
            </div>
            <h5>{movie.name}</h5>
          </article>
        ))}
    </>
  );
}

AdditionalFilmList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default AdditionalFilmList;
