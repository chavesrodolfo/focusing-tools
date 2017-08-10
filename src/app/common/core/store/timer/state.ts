import { TimerHistory, TimerType } from './../../interfaces';

export interface State {
  activeTime?: Date;
  timerType?: TimerType;
  timerHistory: TimerHistory[];
}

const activeTime = new Date();
activeTime.setMinutes(0);
activeTime.setSeconds(0);

export const initialState: State = {
  activeTime,
  timerType: null,
  timerHistory: []
};
