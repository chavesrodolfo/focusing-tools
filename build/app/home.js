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
            templateUrl: 'build/app/home.html?v=1448942474205?v=1448942448506?v=1448939669060?v=1448939666771?v=1448939557469?v=1448939382717',
            directives: [focus_timer_component_1.FocusTimerCmp]
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService])
    ], Home);
    return Home;
})();
exports.Home = Home;
