import {Component, bootstrap, FORM_BINDINGS, bind} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {DataService} from 'app/services/data.service';
import {About} from 'app/about';
import {Home} from 'app/home';

@Component({
    selector: 'agile-pomodoro',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home' },
    { path: '/about', component: About, as: 'About' }
])
class App {
    milestones: any;

    constructor(dataService: DataService) {
        this.milestones = [];

        // dataService.loadMilestones().then(milestones => {
        //     this.milestones = dataService.data.slimMilestones;
        // });
    }
}

bootstrap(App, [
    ROUTER_BINDINGS,
    FORM_BINDINGS,
    HTTP_BINDINGS,
    bind(ROUTER_PRIMARY_COMPONENT).toValue(App),
    bind(LocationStrategy).toClass(HashLocationStrategy),
    [
        DataService
    ]
]);