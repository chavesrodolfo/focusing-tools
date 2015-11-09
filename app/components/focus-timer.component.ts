import {Component, EventEmitter, Title} from 'angular2/angular2';
import {PhaseType} from 'app/interfaces/interfaces';

@Component({
    selector: 'focus-timer',
    templateUrl: 'app/components/focus-timer.component.html',
    events: ['timeCompleted']
})
export class FocusTimerCmp {
    runningTime: Date;
    timeCompleted: EventEmitter;
    focusRunning: boolean;
    shortRunning: boolean;
    longRunning: boolean;
    clockRunning: boolean;

    private _interval: any;

    constructor() {
        this.timeCompleted = new EventEmitter();
        this._stopTimer();
        this._enableButtons();
    }

    startFocus() {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        } else {
            this._startTimer(1);
            this._disableButtons();
            this.focusRunning = true;
        }
    }

    startShortBreak() {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        } else {
            this._startTimer(5);
            this._disableButtons();
            this.shortRunning = true;
        }
    }

    startLongBreak() {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        } else {
            this._startTimer(15);
            this._disableButtons();
            this.longRunning = true;
        }
    }

    private _stopTimer() {
        clearInterval(this._interval);
        // Refactor to use DOM Adapter once ng2 fixed
        document.title = 'Focus Timer';
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this.clockRunning = false;
    }

    private _disableButtons() {
        this.focusRunning = false;
        this.shortRunning = false;
        this.longRunning = false;
    }

    private _enableButtons() {
        this.focusRunning = true;
        this.shortRunning = true;
        this.longRunning = true;
    }

    private _startTimer(mins: number) {
        this.clockRunning = true;
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(mins + 1);

        this._interval = setInterval(() => {
            if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
                this._stopTimer();
                this._enableButtons();

                switch (mins) {
                    case 1:
                        this.timeCompleted.next(PhaseType.POMIDORO);
                        break;
                    case 5:
                        this.timeCompleted.next(PhaseType.SHORT_BREAK);
                        break;
                    case 15:
                        this.timeCompleted.next(PhaseType.LONG_BREAK);
                        break;
                    default:
                        break;
                }

            } else {
                this.runningTime = new Date(this.runningTime.getTime() - 1000);
                // Refactor to use DOM Adapter once ng2 fixed
                document.title = `${this.runningTime.getMinutes() }:${this.runningTime.getSeconds() }`;
            }

        }, 1000);
    }
}