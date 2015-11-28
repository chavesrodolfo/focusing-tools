import {Component, EventEmitter, Title} from 'angular2/angular2';
import {TimerService} from '../services/timer.service';

@Component({
    selector: 'focus-timer',
    templateUrl: 'app/components/focus-timer.component.html',
    events: ['timeCompleted']
})
export class FocusTimerCmp {
    runningTime: Date;
    timeCompleted: EventEmitter<boolean>;
    focusRunning: boolean;
    shortRunning: boolean;
    longRunning: boolean;
    clockRunning: boolean;
    
    private _selectedTime: number;
    private _interval: any;

    constructor(private _timerService: TimerService) {
        this.timeCompleted = new EventEmitter();
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        
        this.clockRunning = false;
        this._timerService.runningTime$.subscribe(time => this._calcTime(time));
        this._enableButtons();
    }

    startFocus() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        } else {
            this._timerService.startTimer(1);
            this._disableButtons();
            this.focusRunning = true;
        }
    }

    startShortBreak() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        } else {
            this._timerService.startTimer(5);
            this._disableButtons();
            this.shortRunning = true;
        }
    }

    startLongBreak() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        } else {
            this._timerService.startTimer(15);
            this._disableButtons();
            this.longRunning = true;
        }
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

    private _calcTime(time: Date) {
        this.runningTime = time;
        this.clockRunning = true;
        document.title = `${this.runningTime.getMinutes() }:${this.runningTime.getSeconds() }`;
        
        if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
            this.timeCompleted.next(true);
            this._enableButtons();
            this.clockRunning = false;
        }
    }
}