import {Injectable} from 'angular2/angular2';
import {AuthUser} from 'app/interfaces';

declare let Firebase;

@Injectable()
export class AuthService {
	authUser$: Rx.Observable<any>;;
    private _firebaseRef: any;
	private _authUserObserver: Rx.Observer<any>;
	
    constructor() {
        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
		this.authUser$ = Rx.Observable.create(observer => this._authUserObserver = observer).share();
		this.authUser$.subscribe();

		this._firebaseRef.onAuth(authData => {
			if (authData) {
				this._authUserObserver.onNext(authData);
			} else {
				this._authUserObserver.onNext(null);
			}
		});
    }

	get userSession(): AuthUser { // dep
		return this._firebaseRef.getAuth();
	}
	
	loadAuthUser() {
		this._authUserObserver.onNext(this._firebaseRef.getAuth());
	}

	login() {
		this._firebaseRef.authWithOAuthPopup('twitter', (error, authData) => {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
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