import {Injectable} from 'angular2/angular2';
import {AuthUser} from 'app/interfaces';

declare let Firebase;

@Injectable()
export class AuthService {
    private _firebaseRef: any;

    constructor() {
        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
		this._firebaseRef.onAuth(authData => {
			if (authData) {
				console.log("User " + authData.uid + " is logged in with " + authData.provider);
			} else {
				console.log("User is logged out");
			}
		});
    }

	get userSession(): AuthUser {
		return this._firebaseRef.getAuth();
	}

	login() {
		this._firebaseRef.authWithOAuthPopup('twitter', (error, authData) => {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
				console.log('Authenticated successfully with payload:', authData);
			}
		});
	}

	logout() {
		this._firebaseRef.unauth();
	}

	isLoggedIn() {
		return !!this._firebaseRef.getAuth();
	}
}