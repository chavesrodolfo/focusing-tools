import { ActionReducer, Action } from '@ngrx/store';
import { Howl } from 'howler';

import { type } from './../../util';
import { State as AppSettings } from './state';

export const ActionTypes = {
  SET_APP_SETTINGS: type('[Settings] Set App Settings'),
  SET_APP_SETTINGS_NOTIFICATIONS: type('[Settings] Set App Notification Settings'),
  SET_APP_SETTINGS_SOUND: type('[Settings] Set App Sound Settings')
};

export class SetAppSettingsAction implements Action {
  type = ActionTypes.SET_APP_SETTINGS;

  constructor(public payload: AppSettings) { }
}

export class SetAppSettingsNotificationStatusAction implements Action {
  type = ActionTypes.SET_APP_SETTINGS_NOTIFICATIONS;

  constructor(public payload: boolean) { }
}

export class SetAppSettingsSound implements Action {
  type = ActionTypes.SET_APP_SETTINGS_SOUND;

  constructor(public payload: { sound: Howl, soundType: string }) { }
}
