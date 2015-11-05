System.register(['angular2/angular2', 'angular2/router', 'angular2/http', 'app/services/data.service', 'app/services/auth.service', 'app/about', 'app/home', 'app/stats'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, router_1, http_1, data_service_1, auth_service_1, about_1, home_1, stats_1;
    var App;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (stats_1_1) {
                stats_1 = stats_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(_authService) {
                    this._authService = _authService;
                    this.loggedIn = this._authService.isLoggedIn();
                }
                App = __decorate([
                    angular2_1.Component({
                        selector: 'agile-pomodoro',
                        templateUrl: 'app/app.html',
                        directives: [router_1.RouterOutlet, router_1.RouterLink, angular2_1.CORE_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_1.Home, as: 'Home' },
                        { path: '/about', component: about_1.About, as: 'About' },
                        { path: '/stats', component: stats_1.Stats, as: 'Stats' }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], App);
                return App;
            })();
            angular2_1.bootstrap(App, [
                router_1.ROUTER_BINDINGS,
                angular2_1.FORM_BINDINGS,
                http_1.HTTP_BINDINGS,
                angular2_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(App),
                angular2_1.bind(router_1.LocationStrategy).toClass(router_1.HashLocationStrategy),
                [
                    data_service_1.DataService,
                    auth_service_1.AuthService
                ]
            ]);
        }
    }
});
