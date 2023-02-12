import dayJs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayJs().startOf("year");
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
