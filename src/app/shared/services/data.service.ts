import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { AuthService } from './auth.service';
import { AuthUser, FocusPhase, PhaseType } from '../../interfaces/interfaces';

@Injectable()
export class DataService {
  private authUser: AuthUser;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
    this.authService.authUser.subscribe(authUser => this.authUser = authUser);
  }

  get focusPhases$(): Observable<FocusPhase[] | any[]> {
    return this.authService.authUser.flatMap(user => {
      console.log(user);
      if (user) {
        return this.angularFire.database.list(`/users/${this.authUser.uid}/focusPhases`);
      } else {
        return Observable.of([]);
      }
    });
  }

  addFocusPhase(focusPhase: FocusPhase) {
    this.authService.authUser.subscribe(user => {
      return this.angularFire.database.list(`/users/${this.authUser.uid}/focusPhases`).push(focusPhase);
    });
  }
}