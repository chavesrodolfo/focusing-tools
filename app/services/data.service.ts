import {Injectable} from 'angular2/angular2';
import {Pomodori, EventType} from 'app/interfaces';
import {AuthService} from 'app/services/auth.service';
import {AuthUser} from 'app/interfaces';

declare let Firebase;

@Injectable()
export class DataService {
    pomodori$: Rx.Observable<any>;
    private _pomodoriObserver: Rx.Observer<any>;
    private _firebaseRef: any;
    private _authUser: AuthUser;

    constructor(private _authService: AuthService) {
        this.pomodori$ = Rx.Observable.create(observer => this._pomodoriObserver = observer).share();
        this.pomodori$.subscribe();

        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
        this._authService.authUser$.subscribe(authUser => {
            this._authUser = authUser;
            this.loadPomodori();
        });

        this._authService.loadAuthUser();
    }

    loadPomodori() {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/pomodori`).on('value', snapshot => {
                this._pomodoriObserver.onNext(this._firebaseArrayToArray(snapshot.val()));
            }, errorObject => {
                console.log('The read failed: ' + errorObject.code);
            });
        } else {
            this._pomodoriObserver.onNext([]);
        }
    }

    addPomodori(pomodori: Pomodori) {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/pomodori`).push(pomodori);
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