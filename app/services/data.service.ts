import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {AuthUser, FocusPhase, PhaseType} from '../interfaces/interfaces';

declare let Firebase;

@Injectable()
export class DataService {
    focusPhases$: Observable<Array<FocusPhase>>;
    private _focusPhasesObserver: any;
    private _firebaseRef: any;
    private _authUser: AuthUser;

    constructor(private _authService: AuthService) {
        this.focusPhases$ = new Observable(observer => this._focusPhasesObserver = observer).share();
        this.focusPhases$.subscribe();
        
        this._firebaseRef = new Firebase('https://focus-app.firebaseio.com/');
        this._authService.authUser$.subscribe(authUser => {
            this._authUser = authUser;
            this.loadFocusPhases();
        });

        this._authService.loadAuthUser();
    }

    loadFocusPhases() {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/focusPhases`).on('value', snapshot => {
                this._focusPhasesObserver.next(this._firebaseArrayToArray(snapshot.val()));
            }, errorObject => {
                console.log('The read failed: ' + errorObject.code);
            });
        } else {
            this._focusPhasesObserver.next([]);
        }
    }

    addFocusPhase(focusPhase: FocusPhase) {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/focusPhases`).push(focusPhase);
        }
    }

    private _firebaseArrayToArray(fbArray) {
        let convertedArray = [];

        for (let property in fbArray) {
            if (fbArray.hasOwnProperty(property)) {
                convertedArray.push(fbArray[property]);
            }
        }

        return convertedArray;
    }
}