import React, { useEffect, useLayoutEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import PromotionList from "./promotion-list";
import PromotionDetail from "./promotion-detail";
import PendingSpinner from "../../components/pending-spinner";
import AdditionalFilmList from "../../components/additional-film-list";
import { getPlayingHottestMovies } from "../../reducers/film";

function PromotionPage(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { playingMovies, pendingPlayingMovies: pendingMovies } = useSelector(
    (state) => state.film
  );
  const { pending: pendingPromotion } = useSelector((state) => state.promotion);

  const location = useLocation();

  useEffect(() => {
    dispatch(getPlayingHottestMovies({ limit: 3 }));
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="promotion-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Switch>
            <Route exact path={path}>
              <PromotionList />
            </Route>
            <Route path={`${path}/:promotionId`}>
              <PromotionDetail />
            </Route>
          </Switch>
          <section className="sub-content-container">
            <AdditionalFilmList movies={playingMovies} />
          </section>
        </main>
        <Footer />
      </div>
      {(pendingMovies || pendingPromotion) && <PendingSpinner />}
    </div>
  );
}

export default PromotionPage;
