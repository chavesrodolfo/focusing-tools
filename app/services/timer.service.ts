import {Injectable} from 'angular2/angular2';

@Injectable()
export class TimerService {
	runningTime$: Rx.Observable<any>;
	private _runningTimeObserver: Rx.Observer<any>;
	private _runningTime: Date;
	private _interval: any;

	constructor() {
		this._runningTime = new Date();
		this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(0);
		this.runningTime$ = Rx.Observable.create(observer => this._runningTimeObserver = observer).share();
	}

	startTime(minutes: number) {
		this._runningTime.setMinutes(minutes);
		this._interval = setInterval(this._tick(), 1000);
	}

	private _tick() {
		this._runningTime.setSeconds(this._runningTime.getSeconds() - 1);
		this._runningTimeObserver.onNext(this._runningTime);
	}
}