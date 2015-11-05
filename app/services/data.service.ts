import {Injectable} from 'angular2/angular2';
import {Pomodori, EventType} from 'app/interfaces';
import {AuthService} from 'app/services/auth.service';

declare let Firebase;

@Injectable()
export class DataService {
    pomodori$: Rx.Observable<any>;
    private _pomodoriObserver: Rx.Observer<any>;
    private _firebaseRef: any;

    constructor(private _authService: AuthService) {
        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
        this.pomodori$ = Rx.Observable.create(observer => this._pomodoriObserver = observer).share();
    }

    loadPomodori() {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authService.userSession.uid}/pomodori`).on('value', snapshot => {
                let tempArray = [];
                    
                for (let property in snapshot.val()) {
                    if (snapshot.val().hasOwnProperty(property)) {
                        tempArray.push(snapshot.val()[property]);
                    }
                }

                this._pomodoriObserver.onNext(tempArray);
            }, errorObject => {
                console.log('The read failed: ' + errorObject.code);
            });
        }
    }

    addPomodori(pomodori: Pomodori) {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authService.userSession.uid}/pomodori`).push(pomodori);
        }
    }
}