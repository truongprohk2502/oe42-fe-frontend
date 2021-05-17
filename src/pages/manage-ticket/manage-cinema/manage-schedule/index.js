import React from "react";
import "./style.sass";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ListSchedule from "./list-schedule";
import DetailSchedule from "./detail-schedule";

function ManageSchedule(props) {
  const { url } = useRouteMatch();

  return (
    <div className="manage-schedule-container">
      <Switch>
        <Route exact path={url}>
          <ListSchedule />
        </Route>
        <Route path={`${url}/:scheduleId`}>
          <DetailSchedule />
        </Route>
      </Switch>
    </div>
  );
}

export default ManageSchedule;
