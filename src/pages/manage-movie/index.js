import React from "react";
import "./style.sass";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PendingSpinner from "../../components/pending-spinner";
import { useSelector } from "react-redux";
import ListMovie from "./list-movie";
import CrudMovie from "./crud-movie";
import { Route, Switch, useRouteMatch } from "react-router-dom";

function ManageMoviePage(props) {
  const { pending } = useSelector((state) => state.film);
  const { path } = useRouteMatch();

  return (
    <div className="manage-movie-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Switch>
            <Route exact path={path}>
              <ListMovie/>
            </Route>
            <Route path={`${path}/:movieId`}>
              <CrudMovie />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
      {pending && <PendingSpinner />}
    </div>
  );
}

export default ManageMoviePage;
