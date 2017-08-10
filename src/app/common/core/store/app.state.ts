import { AppState } from './app.state';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../../../environments/environment';

import { State as TimerState, initialState as timerState } from './timer/state';
import { State as SettingsState, initialState as settingsState } from './settings/state';

import { reducer as timerReducer } from './timer/reducer';
import { reducer as settingsReducer } from './settings/reducer';

export interface AppState {
  timer: TimerState;
  settings: SettingsState;
}

export const state: AppState = {
  timer: timerState,
  settings: settingsState
};

export const reducers = {
  timer: timerReducer,
  settings: settingsReducer
};
