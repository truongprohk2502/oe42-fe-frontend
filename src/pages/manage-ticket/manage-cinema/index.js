import React, { useEffect } from "react";
import "./style.sass";
import { useDispatch } from "react-redux";
import { getDetailCinema } from "../../../reducers/cinema";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import ListMovie from "./list-movie";
import ManageSchedule from "./manage-schedule";

function ManageCinema(props) {
  const dispatch = useDispatch();
  const { cinemaId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getDetailCinema(cinemaId));
  }, [dispatch, cinemaId]);

  return (
    <div className="manage-cinema-container">
      <Switch>
        <Route exact path={url}>
          <ListMovie />
        </Route>
        <Route path={`${url}/:movieId`}>
          <ManageSchedule />
        </Route>
      </Switch>
    </div>
  );
}

export default ManageCinema;
