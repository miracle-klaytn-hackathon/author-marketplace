import moment from "moment";

export const formatDateNoTime = (date: Date | string | undefined) => {
  if (!date) {
    return null;
  }
  return moment(date)?.format("DD/MM/YYYY");
};

export const formatDateToUnixTime = (
  date: Date | string | undefined
): number | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).unix();
};

export const formatDateToUtc = (date: Date | string | undefined) => {
  if (!date) {
    return undefined;
  }
  return moment(date).utc().toDate();
};
