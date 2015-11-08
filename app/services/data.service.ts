import {Injectable} from 'angular2/angular2';
import {AuthService} from 'app/services/auth.service';
import {AuthUser, FocusPhase, PhaseType} from 'app/interfaces/interfaces';

declare let Firebase;

@Injectable()
export class DataService {
    focusPhases$: Rx.Observable<any>;
    private _focusPhasesObserver: Rx.Observer<any>;
    private _firebaseRef: any;
    private _authUser: AuthUser;

    constructor(private _authService: AuthService) {
        this.focusPhases$ = Rx.Observable.create(observer => this._focusPhasesObserver = observer).share();
        this.focusPhases$.subscribe();

        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
        this._authService.authUser$.subscribe(authUser => {
            this._authUser = authUser;
            this.loadFocusPhases();
        });

        this._authService.loadAuthUser();
    }

    loadFocusPhases() {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/focusPhases`).on('value', snapshot => {
                this._focusPhasesObserver.onNext(this._firebaseArrayToArray(snapshot.val()));
            }, errorObject => {
                console.log('The read failed: ' + errorObject.code);
            });
        } else {
            this._focusPhasesObserver.onNext([]);
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