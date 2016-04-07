import {Component, EventEmitter} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
import {TimerService} from '../services/timer.service';
import {PhaseType} from '../interfaces/interfaces';

@Component({
    selector: 'focus-timer',
    templateUrl: 'app/components/focus-timer.component.html',
    events: ['timeCompleted']
})
export class FocusTimerCmp {
    runningTime: Date;
    timeCompleted: EventEmitter<boolean>;
    phaseType: PhaseType;
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
        this.phaseType = this._timerService.runningPhaseType;
    }

    startFocus() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
        } else {
            this._timerService.startTimer(PhaseType.FOCUS);
        }
        
        this.phaseType = this._timerService.runningPhaseType;
    }

    startShortBreak() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
        } else {
            this._timerService.startTimer(PhaseType.SHORT_BREAK);
        }
        
        this.phaseType = this._timerService.runningPhaseType;
    }

    startLongBreak() {
        if (this.clockRunning) {
            this._timerService.stopTimer();
        } else {
            this._timerService.startTimer(PhaseType.LONG_BREAK);
        }
        
        this.phaseType = this._timerService.runningPhaseType;
    }

    private _calcTime(time: Date) {
        this.runningTime = time;
        this.clockRunning = true;
        document.title = `${this.runningTime.getMinutes() }:${this.runningTime.getSeconds() }`;
        
        if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
            this.timeCompleted.next(true);
            this.clockRunning = false;
            document.title = 'Focus Time Management';
        }
    }
}