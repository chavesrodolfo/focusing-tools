import {Component, bootstrap, FORM_BINDINGS, bind, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {DataService} from 'app/services/data.service';
import {AuthService} from 'app/services/auth.service';
import {About} from 'app/about';
import {Home} from 'app/home';
import {Stats} from 'app/stats';
import {AuthUser} from 'app/interfaces/interfaces';

@Component({
    selector: 'focus-app',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home' },
    { path: '/about', component: About, as: 'About' },
    { path: '/stats', component: Stats, as: 'Stats' }
])
class App { 
    authUser: AuthUser;
    
    constructor(private _authService: AuthService) {
        this._authService.authUser$.subscribe(user => this.authUser = user);
        this._authService.loadAuthUser();
    }
    
    login() {
        this._authService.login();
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
        AuthService
    ]
]);