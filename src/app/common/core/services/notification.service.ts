import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Push from 'push.js';

import { AppState } from './../store/app.state';
import { SetNotificationsStatusAction } from './../store/notification/actions';

@Injectable()
export class NotificationService {
  notificationsEnabled: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.notificationsEnabled = this.store.select(state => state.notification.notificationsEnabled);

    if (Push.Permission.get() === Push.Permission.GRANTED) {
      this.store.dispatch(new SetNotificationsStatusAction(true));
    } else {
      this.store.dispatch(new SetNotificationsStatusAction(false));
    }
  }

  requestPermission() {
    Push.Permission.request(() => {
      this.store.dispatch(new SetNotificationsStatusAction(true));
    }, () => {
      this.store.dispatch(new SetNotificationsStatusAction(false));
    });
  }

  notify() {
    Push.create('Focus Time Complete', {
      body: 'Take a Break!',
      icon: '/assets/images/icon.png',
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      }
    });
  }
}
