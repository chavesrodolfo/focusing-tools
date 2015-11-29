import {Injectable, Observable} from 'angular2/angular2';
import {NotificationPermission} from '../interfaces/interfaces';
declare let Notification; // Browser W3C Spec Notification API

@Injectable()
export class NotificationService {
	hasPermission() {
		const permission = Notification.permission;
		
		if(permission === 'granted'){
			return NotificationPermission.GRANTED;
		} else if(permission === 'denied'){
			return NotificationPermission.DENIED;
		} else if(permission === 'unknown'){
			return NotificationPermission.UNSUPPORTED; 
		}
	}
	
	requestPermission() {
		Notification.requestPermission(permission => {
			alert(permission);
		});
	}
}