// import { Injectable } from '@angular/core';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { AngularFire } from 'angularfire2';

// import { ActionTypes } from './../timer/actions';

// @Injectable()
// export class HistoryEffects {
//   @Effect() history = this.actions
//     .ofType(ActionTypes.ADD_TIMER_HISTORY)
//     .switchMap(payload => this.angularFire.auth.switchMap(auth =>
//       this.angularFire.database.list(`/users/${auth.uid}/history`).push(history)))
//       .map(res => ({ type: 'HISTORY_LOAD_SUCCESS', payload: res }))
//       .catch(() => Observable.of({ type: 'HISTORY_LOAD_FAILED' }));

//   constructor(
//     private angularFire: AngularFire,
//     private actions: Actions
//   ) { }
// }