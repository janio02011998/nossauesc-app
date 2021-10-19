export const formartScheduleWeek = (dataTimerWeek: any) => {
  const weekSchedule = Object.keys(dataTimerWeek).map(
    (i: string, value: any) => {
      const startAt =
        dataTimerWeek[i].startAtH.padStart(2, "0") +
        ":" +
        dataTimerWeek[i].startAtM.padStart(2, "0");
      const finishAt =
        dataTimerWeek[i].finishAtH.padStart(2, "0") +
        ":" +
        dataTimerWeek[i].finishAtM.padStart(2, "0");

      return {
        day: i,
        startAt,
        finishAt,
      };
    }
  );
  return { ...weekSchedule };
};
