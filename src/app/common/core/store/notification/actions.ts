import { ActionReducer, Action } from '@ngrx/store';
import { type } from './../../util';

export const ActionTypes = {
  SET_NOTIFICATIONS_STATUS: type('[Notifications] Set Notifications Status')
};

export class SetNotificationsStatusAction implements Action {
  type = ActionTypes.SET_NOTIFICATIONS_STATUS;

  constructor(public payload: boolean) { }
}
