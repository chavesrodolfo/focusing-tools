import {Injectable, Observable} from 'angular2/angular2';
import {DataService} from './data.service';
import {NotificationService} from './notification.service';
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

    constructor(
        private _dataService: DataService,
        private _notificationService: NotificationService) {

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
        this._runningTime.setMinutes(mins + 1);
        this._runningTime.setSeconds(0); // test until ready for mins

        this._interval = setInterval(() => {
            if (this._timerFinished()) {
                this.stopTimer();
                this._saveTime();
            } else {
                this._runningTime = new Date(this._runningTime.getTime() - 1000);
            }

            this._timerObserver.next(this._runningTime);
        }, 1000);
    }

    private _timerFinished() {
        return (this._runningTime.getSeconds() === 0 && this._runningTime.getMinutes() === 0);
    }

    private _saveTime() {
        let phaseType = null;
        let message = null;

        switch (this._selectedTime) {
            case 1:
                phaseType = PhaseType.FOCUS;
                message = 'Focus Phase Complete!';
                break;
            case 5:
                phaseType = PhaseType.SHORT_BREAK;
                message = 'Short Break Complete!';
                break;
            case 15:
                phaseType = PhaseType.LONG_BREAK;
                message = 'Long Break Complete!';
                break;
            default:
                phaseType = PhaseType.CUSTOM_BREAK;
                message = 'Custom Brake Complete!';
                break;
        }

        this._dataService.addFocusPhase({ phaseType, dateCreated: Firebase.ServerValue.TIMESTAMP });
        this._notificationService.openNotification(message);
    }
}