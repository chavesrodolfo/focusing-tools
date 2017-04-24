export enum TimerType {
  Standard = 25,
  ShortBreak = 5,
  LongBreak = 15
}

export interface TimerHistory {
  date: string;
  type: TimerType;
}
