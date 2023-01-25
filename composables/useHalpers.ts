import _ from "lodash";

export const useDateToLocalString = (date: Date | string, local = 'ru-Ru'): string => {
  if (typeof date === "string") {
    const createDate = new Date(date);
    if (_.isDate(createDate)) {
      return createDate.toLocaleDateString();
    } else {
      return "";
    }
  } else {
    return date ? date.toLocaleDateString(local) : "";
  }
};
