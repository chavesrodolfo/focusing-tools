import {Component} from 'angular2/angular2';

@Component({
    selector: 'focus-user-image',
    templateUrl: 'app/components/focus-user-image.component.html',
	inputs: ['authUser']
})
export class FocusUserImageCmp {
    authUser: any;
}
