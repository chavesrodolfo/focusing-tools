import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../../shared';
import { AuthUser, FocusPhase, PhaseType } from '../../interfaces/interfaces';

@Injectable()
export class DataService {
  private authUser: AuthUser;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
    this.authService.authUser$.subscribe(authUser => this.authUser = authUser);
  }

  get focusPhases$(): Observable<FocusPhase[] | any[]> {
    if (this.authService.isLoggedIn()) {
      return this.angularFire.list(`/users/${this.authUser.uid}/focusPhases`);
    } else {
      return Observable.of([]);
    }
  }

  addFocusPhase(focusPhase: FocusPhase) {
    if (this.authService.isLoggedIn()) {
      this.angularFire.list(`/users/${this.authUser.uid}/focusPhases`).push(focusPhase);
    }
  }
}