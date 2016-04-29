import {Component, bind} from 'angular2/core';
import {FORM_BINDINGS} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {HTTP_BINDINGS} from 'angular2/http';
import {DataService} from './services/data.service';
import {AuthService} from './services/auth.service';
import {TimerService} from './services/timer.service';
import {NotificationService} from './services/notification.service';
import {About} from './about';
import {Home} from './home';
import {Stats} from './stats';
import {AuthUser} from './interfaces/interfaces';
import {FocusUserImageCmp} from './components/focus-user-image.component';

// import 'rxjs/add/operator/share'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/retry';
import 'rxjs/Rx';

@Component({
    selector: 'focus-app',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, RouterLink, FocusUserImageCmp],
    providers: [
        DataService,
        AuthService,
        TimerService,
        NotificationService
    ]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home' },
    { path: '/about', component: About, as: 'About' },
    { path: '/stats', component: Stats, as: 'Stats' }
])
class App {
    authUser: AuthUser;
    navOpen: boolean;

    constructor(private _authService: AuthService) { }

    ngOnInit() {
        this._authService.authUser$.subscribe(user => this.authUser = user);
        this._authService.loadAuthUser();
        this.navOpen = false;
    }

    logout() {
        this._authService.logout();
    }
}

bootstrap(App, [
    ROUTER_BINDINGS,
    FORM_BINDINGS,
    HTTP_BINDINGS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);