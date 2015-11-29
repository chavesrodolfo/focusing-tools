import {Injectable, Observable} from 'angular2/angular2';
import {DataService} from './data.service';
import {PhaseType} from '../interfaces/interfaces';
declare let Firebase;

@Injectable()
export class TimerService {
    runningTime$: Observable<Date>;
    focusRunning: boolean;
    clockRunning: boolean;

    private _timerObserver: any;
    private _runningTime: Date;
    private _interval: any;
    private _selectedTime: number;

    constructor(private _dataService: DataService) {
        this.runningTime$ = new Observable(observer => this._timerObserver = observer);
        this.runningTime$.subscribe();
        this.stopTimer();
    }

    startTimer(time: number) {
        if (this.clockRunning) {
            this.stopTimer();
        } else {
            this._startTimer(time);
            this._selectedTime = time;
            this.focusRunning = true;
        }
    }

    stopTimer() {
        clearInterval(this._interval);
        this._runningTime = new Date();
        this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(0);
        this._timerObserver.next(this._runningTime);
        this.clockRunning = false;
    }

    private _startTimer(mins: number) {
        this.clockRunning = true;
        this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(mins + 1);

        this._interval = setInterval(() => {
            if (this._timerFinished()) {
                this.stopTimer();
                
                switch (this._selectedTime) {
                    case 1:
                        this._saveTime(PhaseType.POMIDORO);
                        break;
                    case 5:
                        this._saveTime(PhaseType.SHORT_BREAK);
                        break;
                    case 15:
                        this._saveTime(PhaseType.LONG_BREAK);
                        break;
                    default:
                        this._saveTime(PhaseType.CUSTOM_BREAK);
                        break;
                }

            } else {
                this._runningTime = new Date(this._runningTime.getTime() - 1000);
            }

            this._timerObserver.next(this._runningTime);
        }, 1000);
    }

    private _timerFinished() {
        return (this._runningTime.getSeconds() === 0 && this._runningTime.getMinutes() === 0);
    }

    private _saveTime(phaseType: PhaseType) {
        this._dataService.addFocusPhase({
            phaseType,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    }
}