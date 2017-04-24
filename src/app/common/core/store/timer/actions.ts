import { ActionReducer, Action } from '@ngrx/store';
import { TimerHistory, TimerType } from './../../interfaces';
import { type } from './../../util';

export const ActionTypes = {
  SET_ACTIVE_TIME: type('[Timer] Set Active Time'),
  ADD_TIMER_HISTORY: type('[Timer] Add Timer History'),
  SET_TIMER_TYPE: type('[Timer] Set Timer Type')
};

export class SetActiveTimeAction implements Action {
  type = ActionTypes.SET_ACTIVE_TIME;

  constructor(public payload: Date) { }
}

export class SetTimerTypeAction implements Action {
  type = ActionTypes.SET_TIMER_TYPE;

  constructor(public payload: TimerType) { }
}

export class AddTimerHistoryAction implements Action {
  type = ActionTypes.ADD_TIMER_HISTORY;

  constructor(public payload: TimerHistory) { }
}
