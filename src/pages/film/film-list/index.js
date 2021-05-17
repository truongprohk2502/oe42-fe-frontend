import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";
import { getSearchMovies } from "../../../reducers/film";
import * as routePath from "../../../constants/routes";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/pagination";
import { LIMIT_SEARCH_MOVIES_PER_PAGE } from "../../../constants/limitRecord";
import { useTranslation } from "react-i18next";

function FilmList(props) {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPage } = useSelector(
    (state) => state.film
  );
  const { t } = useTranslation();
  const query = useQuery();
  const keyword = query.get("keyword");

  useEffect(() => {
    dispatch(
      getSearchMovies({
        keyword,
        page: 1,
        limit: LIMIT_SEARCH_MOVIES_PER_PAGE,
      })
    );
  }, [dispatch, keyword]);

  return (
    <main className="film-list-container">
      {movies && movies.length > 0 ? (
        <div className="list-film-bound">
          {movies.map((film) => (
            <article className="film-item" key={film.id}>
              <img src={film.img} alt={film.name} />
              <div className="action">
                <Link to={routePath.FILM_PAGE_PATH + "/" + film.id}>
                  {t("common.button_title.order_ticket")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-data">
          <i className="fa fa-trash"></i>&nbsp;
          <span>{t("error.not_found_film") + " " + keyword}</span>
        </div>
      )}
      {movies && movies.length > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPage={totalPage}
          action={getSearchMovies}
          limitRecords={LIMIT_SEARCH_MOVIES_PER_PAGE}
          keyword={keyword}
        />
      )}
    </main>
  );
}

export default FilmList;
