import moment from "moment";
import * as Yup from "yup";

export default Yup.object().shape({
  room: Yup.string().required("validation_error.room_null"),
  date: Yup.date()
    .min(
      moment(Date.now()).format("YYYY-MM-DD"),
      "validation_error.date_not_future"
    )
    .required("validation_error.date_null"),
  time: Yup.string().required("validation_error.time_null"),
});
