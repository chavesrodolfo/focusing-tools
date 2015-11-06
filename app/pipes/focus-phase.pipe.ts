import {Pipe} from 'angular2/angular2';
declare let marked; // https://github.com/chjj/marked

@Pipe({
    name: 'phasetype'
})
export class FocusPhasePipe {
    transform(val, args) {
		switch(val) {
			case 0:
				return 'Pomodoro';
				break;
			case 1:
				return 'Short Break';
				break;
			case 2: 
				return 'Long Break';
				break;
			default:
				return 'Error';
				break;
		}
    }
}