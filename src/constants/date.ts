import moment from "moment";

export const dateRangesOptions = [
  {
    label: "Last week",
    value: {
      from: moment().subtract(1, "week").startOf("week").toDate(),
      to: moment().toDate(),
    },
  },
  {
    label: "Last month",
    value: {
      from: moment().subtract(1, "month").startOf("month").toDate(),
      to: moment().toDate(),
    },
  },
  {
    label: "Last 3 months",
    value: {
      from: moment().subtract(3, "month").startOf("month").toDate(),
      to: moment().toDate(),
    },
  },
  {
    label: "Last year",
    value: {
      from: moment().subtract(1, "year").startOf("year").toDate(),
      to: moment().toDate(),
    },
  },
];
