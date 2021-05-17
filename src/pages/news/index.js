import React, { useEffect, useLayoutEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import AdditionalFilmList from "../../components/additional-film-list";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PendingSpinner from "../../components/pending-spinner";
import { getPlayingHottestMovies } from "../../reducers/film";
import NewsDetail from "./news-detail";
import NewsList from "./news-list";

function NewsPage(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { playingMovies, pendingPlayingMovies: pendingMovies } = useSelector(
    (state) => state.film
  );
  const { pending: pendingReview } = useSelector((state) => state.review);
  const { pending: pendingBlog } = useSelector((state) => state.blog);

  const location = useLocation();

  useEffect(() => {
    dispatch(getPlayingHottestMovies({ limit: 3 }));
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="news-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Switch>
            <Route exact path={path}>
              <NewsList path={path} />
            </Route>
            <Route path={`${path}/:newsId`}>
              <NewsDetail path={path} />
            </Route>
          </Switch>
          <section className="sub-content-container">
            <AdditionalFilmList movies={playingMovies} />
          </section>
        </main>
        <Footer />
      </div>
      {(pendingMovies ||
        (path === "/review"
          ? pendingReview
          : path === "/blog"
          ? pendingBlog
          : true)) && <PendingSpinner />}
    </div>
  );
}

export default NewsPage;
