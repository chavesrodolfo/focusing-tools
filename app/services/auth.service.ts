import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import {AuthUser, AuthType} from '../interfaces/interfaces';

declare let Firebase;

@Injectable()
export class AuthService {
	authUser$: Observable<any>;
    private _firebaseRef: any;
	private _authUserObserver: any;

    constructor() {
        this._firebaseRef = new Firebase('https://focus-app.firebaseio.com/');
		this.authUser$ = new Observable(observer => this._authUserObserver = observer).share();
		this.authUser$.subscribe();
		this._firebaseRef.onAuth(authData => this._authUserObserver.next(authData));
    }

	get userSession(): AuthUser {
		return this._firebaseRef.getAuth();
	}

	loadAuthUser() {
        console.log(this._firebaseRef.getAuth());
		this._authUserObserver.next(this._firebaseRef.getAuth());
	}

	login(authType: AuthType) {
		if (authType === AuthType.TWITTER) {
			this._login('twitter');
		} else if (authType === AuthType.GITHUB) {
			this._login('github');
		}
	}

	logout() {
		this._firebaseRef.unauth();
	}

	isLoggedIn() {
		return !!this._firebaseRef.getAuth();
	}

	private _login(authTypeVal: string) {
		this._firebaseRef.authWithOAuthPopup(authTypeVal, (error, authData) => {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
			}
		});
	}
}