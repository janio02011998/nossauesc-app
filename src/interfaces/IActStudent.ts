export interface IActivityStudent {
  banner: string;
  categoryId: string;
  description: string;
  location: string;
  isAcitivity: boolean;
  phrase: string;
  members: any;
  providerId: string;
  weekSchedule?: any;
  schedule?: ISingleEvent;
  title: string;
  uid: string;
}

export interface IWeekDays {
  day: string;
  startAt: string;
  finishAt: string;
}

export interface ISingleEvent {
  date: string;
  day: string;
  time: string;
}
