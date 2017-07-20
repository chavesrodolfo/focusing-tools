import { ActionTypes } from './actions';
import { State, initialState } from './state';

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.SET_APP_SETTINGS:
      return { ...state, ...action.payload };

    case ActionTypes.SET_APP_SETTINGS_NOTIFICATIONS:
      return { ...state, notificationsEnabled: action.payload }

    case ActionTypes.SET_APP_SETTINGS_SOUND:
      return { ...state, ...action.payload }

    default:
      return state;
  }
}
