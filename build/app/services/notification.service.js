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
var interfaces_1 = require('../interfaces/interfaces');
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.hasPermission = function () {
        var permission = Notification.permission;
        if (permission === 'granted') {
            return interfaces_1.NotificationPermission.GRANTED;
        }
        else if (permission === 'denied') {
            return interfaces_1.NotificationPermission.DENIED;
        }
        else if (permission === 'unknown') {
            return interfaces_1.NotificationPermission.UNSUPPORTED;
        }
    };
    NotificationService.prototype.requestPermission = function () {
        Notification.requestPermission(function (permission) {
            alert(permission);
        });
    };
    NotificationService.prototype.openNotification = function (message, body) {
        if (body === void 0) { body = ''; }
        new Notification(message, {
            body: body,
            icon: '/assets/images/favicon.ico'
        });
    };
    NotificationService = __decorate([
        // Browser W3C Spec Notification API
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
})();
exports.NotificationService = NotificationService;
