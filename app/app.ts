import {Component, bootstrap, FORM_BINDINGS, bind} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT, LocationStrategy, HashLocationStrategy} from 'angular2/router';
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

@Component({
    selector: 'focus-app',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, RouterLink, FocusUserImageCmp]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home' },
    { path: '/about', component: About, as: 'About' },
    { path: '/stats', component: Stats, as: 'Stats' }
])
class App { 
    authUser: AuthUser;
    navOpen: boolean;
    
    constructor(private _authService: AuthService) {
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
    bind(ROUTER_PRIMARY_COMPONENT).toValue(App),
    bind(LocationStrategy).toClass(HashLocationStrategy),
    [
        DataService,
        AuthService,
        TimerService,
        NotificationService
    ]
]);