export const formartSchedule = (dataTimer: any) => {
  const d =
    dataTimer.date.padStart(2, "0") + "/" + dataTimer.mounth.padStart(2, "0");

  const t =
    dataTimer.hours.padStart(2, "0") + ":" + dataTimer.minute.padStart(2, "0");

  return { day: "singleEvent", date: d, time: t };
};
