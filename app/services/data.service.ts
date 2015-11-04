import {Injectable} from 'angular2/angular2';
import {Pomodori, EventType} from 'app/interfaces';

declare let Firebase;

@Injectable()
export class DataService {
    pomodori$: Rx.Observable<any>;
    private _pomodoriObserver: Rx.Observer<any>;
    private _firebaseRef: any;
    
    constructor() {
        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
        this.pomodori$ = Rx.Observable.create(observer => this._pomodoriObserver = observer).share();
    }

    loadPomodori() {
        this._firebaseRef.child('events').on('value', snapshot => {
            this._pomodoriObserver.onNext(snapshot.val());
        }, errorObject => {
            console.log('The read failed: ' + errorObject.code);
        });
    }
    
    addPomodori(pomodori: Pomodori) {
        this._firebaseRef.child('events').push().set(pomodori);
    }
}