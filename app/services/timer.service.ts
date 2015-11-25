import {Injectable, Observable} from 'angular2/angular2';

@Injectable()
export class TimerService {
	runningTime: Date;
    focusRunning: boolean;
    clockRunning: boolean;

    private _interval: any;

    constructor() {
        this._stopTimer();
    }

    startFocus(time: number) {
        if (this.clockRunning) {
            this._stopTimer();
        } else {
            this._startTimer(1);
            this.focusRunning = true;
        }
    }

    private _stopTimer() {
        clearInterval(this._interval);
        document.title = 'Focus Timer';
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this.clockRunning = false;
    }

    private _startTimer(mins: number) {
        this.clockRunning = true;
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(mins + 1);

        this._interval = setInterval(() => {
            if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
                this._stopTimer();
                // switch (mins) {
                //     case 1:
                //         this.timeCompleted.next(PhaseType.POMIDORO);
                //         break;
                //     case 5:
                //         this.timeCompleted.next(PhaseType.SHORT_BREAK);
                //         break;
                //     case 15:
                //         this.timeCompleted.next(PhaseType.LONG_BREAK);
                //         break;
                //     default:
                //         break;
                // }
            } else {
                this.runningTime = new Date(this.runningTime.getTime() - 1000);
                // Refactor to use DOM Adapter once ng2 fixed
                document.title = `${this.runningTime.getMinutes() }:${this.runningTime.getSeconds() }`;
            }

        }, 1000);
    }
}