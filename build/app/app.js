System.register(['angular2/angular2', 'angular2/router', 'angular2/http', 'app/services/data.service', 'app/about', 'app/home'], function(exports_1) {
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
    var angular2_1, router_1, http_1, data_service_1, about_1, home_1;
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
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(dataService) {
                    this.milestones = [];
                    // dataService.loadMilestones().then(milestones => {
                    //     this.milestones = dataService.data.slimMilestones;
                    // });
                }
                App = __decorate([
                    angular2_1.Component({
                        selector: 'agile-pomodoro',
                        templateUrl: 'build/app/app.html?v=1446526882044',
                        directives: [router_1.RouterOutlet, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_1.Home, as: 'Home' },
                        { path: '/about', component: about_1.About, as: 'About' }
                    ]), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
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
                    data_service_1.DataService
                ]
            ]);
        }
    }
});
