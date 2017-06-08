import { ActionReducer, Action } from '@ngrx/store';

import { type } from './../../util';
import { State as AppSettings } from './state';

export const ActionTypes = {
  SET_APP_SETTINGS: type('[Settings] Set App Settings'),
  SET_APP_SETTINGS_NOTIFICATIONS: type('[Settings] Set App Notification Settings')
};

export class SetAppSettingsAction implements Action {
  type = ActionTypes.SET_APP_SETTINGS;

  constructor(public payload: AppSettings) { }
}

export class SetAppSettingsNotificationStatusAction implements Action {
  type = ActionTypes.SET_APP_SETTINGS_NOTIFICATIONS;

  constructor(public payload: boolean) { }
}
