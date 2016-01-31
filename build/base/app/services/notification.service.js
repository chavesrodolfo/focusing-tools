var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
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
            console.log(permission);
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
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
})();
exports.NotificationService = NotificationService;
