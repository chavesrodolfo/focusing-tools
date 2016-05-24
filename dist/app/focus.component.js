"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var _home_1 = require('./+home');
var router_1 = require('@angular/router');
var _about_1 = require('./+about');
var _stats_1 = require('./+stats');
var shared_1 = require('./shared');
var focus_user_image_1 = require('./shared/components/focus-user-image');
// import 'rxjs/add/operator/share'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/operator/of';
require('rxjs/Rx');
var FocusAppComponent = (function () {
    function FocusAppComponent(_authService) {
        this._authService = _authService;
        this.title = 'focus works!';
    }
    FocusAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authService.authUser$.subscribe(function (user) { return _this.authUser = user; });
        this.navOpen = false;
    };
    FocusAppComponent.prototype.logout = function () {
        this._authService.logout();
    };
    FocusAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'focus-app',
            templateUrl: 'focus.component.html',
            styleUrls: ['focus.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, focus_user_image_1.FocusUserImageComponent],
            providers: [shared_1.DataService, shared_1.AuthService, shared_1.TimerService, shared_1.NotificationService]
        }),
        router_1.Routes([
            { path: '/', component: _home_1.HomeComponent },
            { path: '/about', component: _about_1.AboutComponent },
            { path: '/stats', component: _stats_1.StatsComponent }
        ]), 
        __metadata('design:paramtypes', [shared_1.AuthService])
    ], FocusAppComponent);
    return FocusAppComponent;
}());
exports.FocusAppComponent = FocusAppComponent;
//# sourceMappingURL=focus.component.js.map