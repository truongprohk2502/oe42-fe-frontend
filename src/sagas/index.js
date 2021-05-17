import { all } from "redux-saga/effects";
import { watcherBanner } from "./banner";
import { watcherPromotion } from "./promotion";
import { watcherReview } from "./review";
import { watcherBlog } from "./blog";
import { watcherFilm } from "./film";
import { watcherAuth } from "./auth";
import { watcherCinema } from "./cinema";
import { watcherOrder } from "./order";
import { watcherSchedule } from "./schedule";
import { watcherFeedback } from "./feedback";
import { watcherUser } from "./user";

export default function* watcherSaga() {
  yield all([
    watcherBanner(),
    watcherPromotion(),
    watcherReview(),
    watcherBlog(),
    watcherFilm(),
    watcherAuth(),
    watcherCinema(),
    watcherOrder(),
    watcherSchedule(),
    watcherFeedback(),
    watcherUser(),
  ]);
}
