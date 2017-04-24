import { TimerHistory, TimerType } from './../../interfaces';

export interface State {
  activeTime?: Date;
  timerType?: TimerType;
  timerHistory: TimerHistory[];
};

const time = new Date();
time.setMinutes(0);
time.setSeconds(0);

export const initialState: State = {
  activeTime: time,
  timerType: null,
  timerHistory: []
};
