import {Component} from 'angular2/angular2';
import {FocusTimerCmp} from './components/focus-timer.component';

declare let Firebase;

@Component({
    selector: 'focus-home',
    templateUrl: 'app/home.html',
    directives: [FocusTimerCmp]
})
export class Home { }
