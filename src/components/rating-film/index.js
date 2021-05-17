import React, { useState } from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { putRating } from "../../reducers/film";
import PropTypes from "prop-types";

function RatingFilm({ movie, from }) {
  const TOTAL_STAR = 10;

  const [showRating, setShowRating] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const ratingUser =
    movie?.ratings?.find((item) => item.accountId === user.id)?.rating || 0;

  const handleRating = (ratingNum) => {
    const editMovie = { ...movie };
    let isEdited = false;
    editMovie.ratings = editMovie.ratings?.map((ratingItem) => {
      const { accountId } = ratingItem;
      if (accountId === user.id) {
        isEdited = true;
        return { accountId, rating: ratingNum };
      }
      return ratingItem;
    });
    if (!isEdited) {
      editMovie.ratings = [
        ...editMovie.ratings,
        {
          accountId: user.id,
          rating: ratingNum,
        },
      ];
    }
    dispatch(
      putRating({
        movie: editMovie,
        from,
      })
    );
  };

  const createStarArray = (totalStar) => {
    const arr = [];
    for (let i = totalStar; i > 0; i--) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className="rating-film-container">
      <button
        className="rating-button"
        onClick={() => setShowRating(!showRating)}
      >
        {t("common.button_title.evaluate")}
      </button>
      {showRating && (
        <div className="rating-group">
          {createStarArray(TOTAL_STAR).map((item) => (
            <div
              key={item}
              className={`rating-item ${ratingUser === item && "active"}`}
            >
              <i className="fa fa-star" onClick={() => handleRating(item)}></i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

RatingFilm.propTypes = {
  movie: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
};

export default RatingFilm;
