import React, { Fragment } from "react";
import "./style.sass";
import { colorOrangeDark } from "../../assets/style/_export.module.scss";
import PropTypes from "prop-types";

function ProgressBar({ progresses, activeIndex }) {
  const getBarStyle = (index) => {
    const style = {
      position: "absolute",
      bottom: "0.8rem",
      height: "0.4rem",
      left: ((1 + 2 * index) * 100) / (2 * progresses.length) + "%",
      width: 100 / progresses.length + "%",
    };
    if (index < activeIndex) {
      style.backgroundColor = colorOrangeDark;
    }
    return style;
  };

  const getNumberOrderBGColor = (index) => {
    if (activeIndex >= 0 && index <= activeIndex) {
      return {
        backgroundColor: colorOrangeDark,
      };
    }
    return {};
  };

  return (
    <div
      className="progress-container"
      style={{ gridTemplateColumns: `repeat(${progresses.length}, 1fr)` }}
    >
      {progresses.length !== 0 &&
        progresses.map((progress, index) => (
          <Fragment key={index}>
            <div className="progress-item">
              <div className="text">{progress}</div>
              <div className="num" style={getNumberOrderBGColor(index)}>
                {index + 1}
              </div>
            </div>
            {index !== progresses.length - 1 && (
              <div className="bar" style={getBarStyle(index)}></div>
            )}
          </Fragment>
        ))}
    </div>
  );
}

ProgressBar.propTypes = {
  progresses: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default ProgressBar;
