import {Component, NgZone} from 'angular2/angular2';
import {TimerService} from 'app/services/timer.service';

@Component({
    selector: 'pom-home',
    templateUrl: 'app/home.html'
})
export class Home { 
    runningTime: Date;
    displayTime: string;
    
    constructor(private _timerService: TimerService) {
        // this.runningTime = new Date();
        // this.runningTime.setMinutes(25);
        // this.runningTime.setSeconds(0);
        // this.displayTime = '25:00';
        
        // let timeIntervalStream = Rx.Observable.create(observer => {
        //     setInterval(() => {
        //         observer.onNext('tick');  
        //     }, 1000);
        // });
        
        // timeIntervalStream.subscribe(() => {
        //    this.runningTime.setSeconds(this.runningTime.getSeconds() - 1); 
        //    this.displayTime = `${this.runningTime.getMinutes()}:${this.runningTime.getSeconds()}`;
        // });
        
        this._timerService.runningTime$.subscribe(val => console.log(val));
        this._timerService.startTime(25);
    }
}
