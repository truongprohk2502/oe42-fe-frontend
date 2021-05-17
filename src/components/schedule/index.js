import React from "react";
import "./style.sass";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Schedule({ name, path, schedules }) {
  return (
    <article className="schedule-component-container">
      <section className="cinema-name">{name}</section>
      <section className="schedule-bound">
        {schedules.length &&
          schedules.map((schedule) => {
            const { id, date, room } = schedule;
            return (
              <Link key={id} to={path + "/" + id}>
                <time className="schedule-item">
                  {moment(date).format("HH:mm") +
                    (room ? " - " + room.name : "")}
                </time>
              </Link>
            );
          })}
      </section>
    </article>
  );
}

Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  schedules: PropTypes.array.isRequired,
};

export default Schedule;
