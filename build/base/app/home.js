var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var focus_timer_component_1 = require('./components/focus-timer.component');
var notification_service_1 = require('./services/notification.service');
var interfaces_1 = require('./interfaces/interfaces');
var Home = (function () {
    function Home(_notificationService) {
        this._notificationService = _notificationService;
        this.notificationsEnabled = false;
        this.notificationsSupported = true;
        if (this._notificationService.hasPermission() === interfaces_1.NotificationPermission.GRANTED) {
            this.notificationsEnabled = true;
        }
        if (this._notificationService.hasPermission() === interfaces_1.NotificationPermission.UNSUPPORTED) {
            this.notificationsSupported = false;
        }
    }
    Home.prototype.enableNotifications = function () {
        this._notificationService.requestPermission();
    };
    Home = __decorate([
        angular2_1.Component({
            selector: 'focus-home',
            templateUrl: 'app/home.html',
            directives: [focus_timer_component_1.FocusTimerCmp]
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService])
    ], Home);
    return Home;
})();
exports.Home = Home;
