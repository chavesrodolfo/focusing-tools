import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TimerHistory } from './../interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class HistoryService {
  history: Observable<TimerHistory[]>;
  totalMinutes: Observable<number>;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService) {

    this.history = this.authService.user.switchMap(auth => {
      if (auth) {
        return this.angularFireDatabase.list(`/users/${auth.uid}/history`, {
          query: {
            limitToLast: 200
          }
        });
      } else {
        return Observable.of([]);
      }
    });

    this.totalMinutes = this.history.map(history =>
      history.reduce((total, next) =>
        next.type === 25 ? total + next.type : total, 0));
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
