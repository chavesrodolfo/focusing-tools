import {Component, NgZone} from 'angular2/angular2';
import {PomTimer} from 'app/components/pom-timer';

@Component({
    selector: 'pom-home',
    templateUrl: 'app/home.html',
    directives: [PomTimer]
})
export class Home {
    eventCompleted(pom) {
        console.log(pom);
    }
}
