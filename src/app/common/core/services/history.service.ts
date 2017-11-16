import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, DatabaseQuery } from 'angularfire2/database';

import { TimerHistory } from './../interfaces';
import { AuthService } from './auth.service';

export interface History {
  id: null;
}

@Injectable()
export class HistoryService {
  history: Observable<TimerHistory[]>;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService) {

    this.history = this.authService.user.switchMap(auth => {
      if (auth) {
        return this.angularFireDatabase
          .list<History>(`/users/${auth.uid}/history`, ref => ref.limitToLast(200))
          .valueChanges();
      } else {
        return Observable.of([]);
      }
    });
  }

  addHistory(history: TimerHistory) {
    return this.authService.user.switchMap(auth => {
      if (auth) {
        return this.angularFireDatabase.list(`/users/${auth.uid}/history`).push(history);
      } else {
        return Observable.of([]);
      }
    });
  }
}
