import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Howl } from 'howler';
import * as Push from 'push.js';

import { AppState } from './../store/app.state';
import { State as AppSettings } from './../store/settings/state';
import { SetAppSettingsAction, SetAppSettingsSound } from './../store/settings/actions';

@Injectable()
export class SettingsService {
  settings: Observable<AppSettings>;

  constructor(private store: Store<AppState>) {
    this.settings = this.store.select(state => state.settings);
  }

  updateSettings(settings: AppSettings) {
    this.store.dispatch(new SetAppSettingsAction(settings));
  }

  updateSound(soundSettings: { sound: Howl, soundType: string}) {
    this.store.dispatch(new SetAppSettingsSound(soundSettings));
  }
}
