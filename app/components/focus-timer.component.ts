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
    private _interval: any;

    constructor() {
        this.timeCompleted = new EventEmitter();
        this.stop();
    }

    startPomodoro(val: number) {
        this.stop();
        this._startTimer(1);
    }

    startShortBreak() {
        this.stop();
        this._startTimer(5);
    }

    startLongBreak() {
        this.stop();
        this._startTimer(15);
    }

    stop() {
        clearInterval(this._interval);
        // Refactor to use DOM Adapter once ng2 fixed
        document.title = 'Focus Timer';
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
    }

    private _startTimer(mins: number) {
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(mins);

        this._interval = setInterval(() => {
            if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
                this.stop();

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