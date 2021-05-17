import React from "react";
import "./style.sass";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PendingSpinner from "../../components/pending-spinner";
import ListCinema from "./list-cinema";
import ManageCinema from "./manage-cinema";

function ManageTicketPage(props) {
  const { path } = useRouteMatch();
  const {
    pending: pendingSelectedCinema,
    pendingCinema,
    pendingCity,
  } = useSelector((state) => (state = state.cinema));
  const { pending: pendingMovies } = useSelector(
    (state) => (state = state.film)
  );
  const { pendingSchedule } = useSelector((state) => (state = state.schedule));

  return (
    <div className="manage-ticket-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Switch>
            <Route exact path={path}>
              <ListCinema />
            </Route>
            <Route path={`${path}/:cinemaId`}>
              <ManageCinema />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
      {(pendingSelectedCinema ||
        pendingMovies ||
        pendingCinema ||
        pendingCity ||
        pendingSchedule) && <PendingSpinner />}
    </div>
  );
}

export default ManageTicketPage;
