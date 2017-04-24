import { ActionTypes } from './actions';
import { State, initialState } from './state';

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.SET_NOTIFICATIONS_STATUS:
      return { ...state, notificationsEnabled: action.payload };

    default:
      return state;
  }
}