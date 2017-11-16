import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Howl } from 'howler';
import * as Push from 'push.js';
import { first } from 'rxjs/operators';

import { AppState } from './../store/app.state';
import { SetAppSettingsNotificationStatusAction } from './../store/settings/actions';

@Injectable()
export class NotificationService {
  notificationsEnabled: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.notificationsEnabled = this.store.select(state => state.settings.notificationsEnabled);

    if (Push.Permission.get() === Push.Permission.GRANTED) {
      this.store.dispatch(new SetAppSettingsNotificationStatusAction(true));
    } else {
      this.store.dispatch(new SetAppSettingsNotificationStatusAction(false));
    }
  }

  requestPermission() {
    Push.Permission.request(() => {
      this.store.dispatch(new SetAppSettingsNotificationStatusAction(true));
    }, () => {
      this.store.dispatch(new SetAppSettingsNotificationStatusAction(false));
    });
  }

  notify() {
    this.chimeNotify();
    this.pushNotify();
  }

  private chimeNotify() {
    this.store.select(state => state.settings.soundEnabled).pipe(
      first()
    ).subscribe(soundEnabled => {
      if (soundEnabled) {
        new Howl({
          src: ['assets/audio/chime.mp3'],
          sprite: {
            chime: [0, 1500]
          }
        }).play('chime');
      }
    });
  }

  private pushNotify() {
    Push.create('Focus Time Complete', {
      body: 'Times Up!',
      icon: '/assets/images/icon.png',
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      }
    });
  }
}
