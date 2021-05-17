import moment from "moment";
import { getTranslation } from "./getTranslation";

const getDayString = (num) => {
  const translation = getTranslation();
  switch (num) {
    case 1:
      return translation.day_of_week?.monday;
    case 2:
      return translation.day_of_week?.tuesday;
    case 3:
      return translation.day_of_week?.wednesday;
    case 4:
      return translation.day_of_week?.thursday;
    case 5:
      return translation.day_of_week?.friday;
    case 6:
      return translation.day_of_week?.saturday;
    case 7:
      return translation.day_of_week?.sunday;
    default:
      return;
  }
};

export const getScheduleDate = (duration) => {
  const date = moment(duration);
  return `${date.format("HH:mm")} | ${getDayString(date.isoWeekday())}, ${date.format(
    "DD/MM/YYYY"
  )}`;
};
