import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../../../environments/environment';

import { State as TimerState } from './timer/state';
import { State as SettingsState } from './settings/state';

import { reducer as timerReducer } from './timer/reducer';
import { reducer as settingsReducer } from './settings/reducer';


export interface AppState {
  timer: TimerState;
  settings: SettingsState;
}

const reducers = {
  timer: timerReducer,
  settings: settingsReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
