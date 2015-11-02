import {Component, NgZone} from 'angular2/angular2';
import {TimerService} from 'app/services/timer.service';

@Component({
    selector: 'pom-home',
    templateUrl: 'app/home.html'
})
export class Home {
    runningTime: Date;

    constructor(private _timerService: TimerService) {
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this._timerService.runningTime$.subscribe(time => this.runningTime = time.getTime());
    }

    start() {
        this._timerService.startTime(25);
    }

    stop() {
        this._timerService.stopTime();
    }
}
