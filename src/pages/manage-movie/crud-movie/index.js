import React, { useEffect, useState } from "react";
import "./style.sass";
import { Field, Formik } from "formik";
import movieSchema from "../../../validations/movieSchema";
import { MOVIE_STATUSES } from "../../../constants/common";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDetailMovie, postMovie, putMovie } from "../../../reducers/film";
import { useHistory, useParams } from "react-router-dom";
import { ADD_MOVIE_PAGE_URI } from "../../../constants/routes";
import moment from "moment";
import { YOUTUBE_URL } from "../../../constants/apiUrl";
import NotFound from "../../../components/not-found";

function CrudMovie(props) {
  const [actor, setActor] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieId } = useParams();
  const { selectedMovie, error } = useSelector((state) => state.film);

  useEffect(() => {
    if (movieId !== ADD_MOVIE_PAGE_URI) {
      dispatch(getDetailMovie(movieId));
    }
  }, [dispatch, movieId]);

  const handleAddActor = (actor, previousValue, setValue) => {
    setValue(
      "actors",
      [...previousValue, { id: previousValue.length, name: actor }],
      false
    );
    setActor("");
  };

  const handleRemoveActor = (actorId, previousValue, setValue) => {
    setValue(
      "actors",
      previousValue.filter((actor) => actor.id !== actorId),
      false
    );
  };

  return (
    <section className="crud-movie-container">
      {error ? (
        <NotFound />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            name: movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.name : "",
            img: movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.img : "",
            trailer:
              movieId !== ADD_MOVIE_PAGE_URI
                ? YOUTUBE_URL + selectedMovie.trailer
                : "",
            summary:
              movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.summary : "",
            runtime:
              movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.timeByMinutes : "",
            category:
              movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.category : "",
            nation: movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.nation : "",
            producer:
              movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.producer : "",
            director:
              movieId !== ADD_MOVIE_PAGE_URI ? selectedMovie.director : "",
            actors:
              movieId !== ADD_MOVIE_PAGE_URI
                ? selectedMovie.actors?.map((actor, index) => ({
                    id: index,
                    name: actor,
                  })) || []
                : [],
            publishedDate:
              movieId !== ADD_MOVIE_PAGE_URI
                ? moment(selectedMovie.publishedDate).format("YYYY-MM-DD")
                : "",
            status:
              movieId !== ADD_MOVIE_PAGE_URI
                ? selectedMovie.status
                : MOVIE_STATUSES.ONGOING,
          }}
          validationSchema={movieSchema}
          onSubmit={(values, action) => {
            const {
              trailer,
              actors,
              publishedDate,
              runtime,
              ...restProps
            } = values;
            dispatch(
              movieId === ADD_MOVIE_PAGE_URI
                ? postMovie({
                    ...restProps,
                    trailer: trailer.split("v=")[1] || "",
                    actors: actors.map((actor) => actor.name),
                    publishedDate: moment(publishedDate).valueOf(),
                    timeByMinutes: runtime,
                    ratings: [],
                  })
                : putMovie({
                    movieId,
                    data: {
                      ...restProps,
                      trailer: trailer.split("v=")[1] || "",
                      actors: actors.map((actor) => actor.name),
                      publishedDate: moment(publishedDate).valueOf(),
                      timeByMinutes: runtime,
                      ratings: selectedMovie.ratings || [],
                    },
                  })
            );
            movieId === ADD_MOVIE_PAGE_URI && action.resetForm();
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <div className="form-title">
                {movieId === ADD_MOVIE_PAGE_URI
                  ? t("common.list_title.add_movie")
                  : t("common.list_title.edit_movie")}
              </div>
              <Field name="name">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="name">{t("movie_title.movie_name")}:</label>
                    <input id="name" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.name && touched.name ? (
                <span>{t(errors.name)}</span>
              ) : null}
              <Field name="img">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="img">{t("movie_title.image")}:</label>
                    <input id="img" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.img && touched.img ? <span>{t(errors.img)}</span> : null}
              <Field name="trailer">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="trailer">{t("movie_title.trailer")}:</label>
                    <input id="trailer" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.trailer && touched.trailer ? (
                <span>{t(errors.trailer)}</span>
              ) : null}
              <Field name="summary">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="summary">{t("movie_title.summary")}:</label>
                    <textarea id="summary" rows="5" {...field} />
                  </div>
                )}
              </Field>
              {errors.summary && touched.summary ? (
                <span>{t(errors.summary)}</span>
              ) : null}
              <Field name="runtime">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="runtime">{t("movie_title.runtime")}:</label>
                    <input id="runtime" type="number" {...field} />
                  </div>
                )}
              </Field>
              {errors.runtime && touched.runtime ? (
                <span>{t(errors.runtime)}</span>
              ) : null}
              <Field name="category">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="category">
                      {t("movie_title.category")}:
                    </label>
                    <input id="category" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.category && touched.category ? (
                <span>{t(errors.category)}</span>
              ) : null}
              <Field name="nation">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="nation">{t("movie_title.nation")}:</label>
                    <input id="nation" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.nation && touched.nation ? (
                <span>{t(errors.nation)}</span>
              ) : null}
              <Field name="producer">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="producer">
                      {t("movie_title.producer")}:
                    </label>
                    <input id="producer" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.producer && touched.producer ? (
                <span>{t(errors.producer)}</span>
              ) : null}
              <Field name="director">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="director">
                      {t("movie_title.director")}:
                    </label>
                    <input id="director" type="text" {...field} />
                  </div>
                )}
              </Field>
              {errors.director && touched.director ? (
                <span>{t(errors.director)}</span>
              ) : null}
              <Field name="actors">
                {({ field: { value }, form: { setFieldValue } }) => (
                  <div className="input-item">
                    <label htmlFor="actors">{t("movie_title.actors")}:</label>
                    <div className="input-array-container">
                      <input
                        id="actors"
                        type="text"
                        value={actor}
                        onChange={(e) => setActor(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddActor(
                              e.target.value,
                              value,
                              setFieldValue
                            );
                          }
                        }}
                      />
                      <div className="actor-container">
                        {value.length !== 0 &&
                          value.map((actor) => (
                            <div key={actor.id} className="actor-item">
                              <span>{actor.name}</span>&nbsp;
                              <i
                                className="fa fa-times"
                                onClick={() =>
                                  handleRemoveActor(
                                    actor.id,
                                    value,
                                    setFieldValue
                                  )
                                }
                              ></i>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </Field>
              {errors.actors && touched.actors ? (
                <span>{t(errors.actors)}</span>
              ) : null}
              <Field name="publishedDate">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="publishedDate">
                      {t("movie_title.published_date")}:
                    </label>
                    <input id="publishedDate" type="date" {...field} />
                  </div>
                )}
              </Field>
              {errors.publishedDate && touched.publishedDate ? (
                <span>{t(errors.publishedDate)}</span>
              ) : null}
              <Field name="status">
                {({ field }) => (
                  <div className="input-item">
                    <label htmlFor="status">{t("label.status")}:</label>
                    <select id="status" {...field}>
                      <option value={MOVIE_STATUSES.ONGOING}>
                        {t("select_option.ongoing")}
                      </option>
                      <option value={MOVIE_STATUSES.PLAYING}>
                        {t("select_option.playing")}
                      </option>
                      <option value={MOVIE_STATUSES.CANCELLED}>
                        {t("select_option.cancelled")}
                      </option>
                    </select>
                  </div>
                )}
              </Field>
              {errors.status && touched.status ? (
                <span>{t(errors.status)}</span>
              ) : null}
              <div className="button-group">
                <button type="submit">
                  {movieId === ADD_MOVIE_PAGE_URI
                    ? t("common.button_title.add")
                    : t("common.button_title.edit")}
                </button>
                <button type="button" onClick={() => history.goBack()}>
                  {t("common.button_title.back")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </section>
  );
}

export default CrudMovie;
