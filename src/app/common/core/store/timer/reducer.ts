import { ActionTypes } from './actions';
import { State, initialState } from './state';

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_TIME:
      return { ...state, activeTime: new Date(action.payload.getTime()) };

    case ActionTypes.ADD_TIMER_HISTORY:
      return { ...state, timerHistory: [...state.timerHistory, action.payload] };

    case ActionTypes.SET_TIMER_TYPE:
      return { ...state, timerType: action.payload };

    default:
      return state;
  }
}
