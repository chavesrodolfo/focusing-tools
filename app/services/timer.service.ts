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
		clearInterval(this._interval);
		this._run(minutes);
	}

	stopTime() {
		clearInterval(this._interval);
		this._reset();
		this._runningTimeObserver.onNext(this._runningTime);
	}

	private _run(minutes: number) {
		this._reset();
		this._runningTime.setMinutes(minutes);

		this._interval = setInterval(() => {

			if (this._runningTime.getMinutes() === 0 && this._runningTime.getSeconds() === 0) {
				clearInterval(this._interval);
			} else {
				this._runningTime.setSeconds(this._runningTime.getSeconds() - 1);
			}

			this._runningTimeObserver.onNext(this._runningTime);
		}, 1000);
	}
	
	private _reset() {
				this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(0);
	}
}