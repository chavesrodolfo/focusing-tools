import {Component, EventEmitter, Title} from 'angular2/angular2';

enum EventType {
    POMIDORO,
    SHORT_BREAK,
    LONG_BREAK
};

interface TimeEvent {
    eventType: EventType,
    dateCreated?: Date
};

@Component({
    selector: 'pom-timer',
    templateUrl: 'app/components/pom-timer.html',
    events: ['timeCompleted']
})
export class PomTimer {
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
        document.title = 'Agile Pomodoro';
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
                this.timeCompleted.next(mins);
            } else {
                this.runningTime = new Date(this.runningTime.getTime() - 1000);
                // Refactor to use DOM Adapter once ng2 fixed
                document.title = `${this.runningTime.getMinutes() }:${this.runningTime.getSeconds() }`;
            }

        }, 1000);
    }
}