import React from "react";
import "./style.sass";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import FilmList from "./film-list";
import FilmDetail from "./film-detail";
import PendingSpinner from "../../components/pending-spinner";
import { useSelector } from "react-redux";

function FilmPage(props) {
  const { path } = useRouteMatch();
  const {
    pendingPlayingMovies: pendingMovies,
    pending: pendingDetailMovie,
  } = useSelector((state) => state.film);
  const { pendingCity, pendingCinema } = useSelector((state) => state.cinema);

  return (
    <div className="film-page-container">
      <Header />
      <div className="responsive-container">
        <Switch>
          <Route exact path={path}>
            <FilmList path={path} />
          </Route>
          <Route path={`${path}/:filmId`}>
            <FilmDetail path={path} />
          </Route>
        </Switch>
        <Footer />
      </div>
      {(pendingMovies ||
        pendingDetailMovie ||
        pendingCity ||
        pendingCinema) && <PendingSpinner />}
    </div>
  );
}

export default FilmPage;
