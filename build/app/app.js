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
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var data_service_1 = require('./services/data.service');
var auth_service_1 = require('./services/auth.service');
var timer_service_1 = require('./services/timer.service');
var about_1 = require('./about');
var home_1 = require('./home');
var stats_1 = require('./stats');
var App = (function () {
    function App(_authService) {
        var _this = this;
        this._authService = _authService;
        this._authService.authUser$.subscribe(function (user) { return _this.authUser = user; });
        this._authService.loadAuthUser();
    }
    App.prototype.login = function () {
        this._authService.login();
    };
    App.prototype.logout = function () {
        this._authService.logout();
    };
    App = __decorate([
        angular2_1.Component({
            selector: 'focus-app',
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
        auth_service_1.AuthService,
        timer_service_1.TimerService
    ]
]);
