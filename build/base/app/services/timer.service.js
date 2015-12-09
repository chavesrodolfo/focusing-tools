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
var data_service_1 = require('./data.service');
var notification_service_1 = require('./notification.service');
var interfaces_1 = require('../interfaces/interfaces');
var TimerService = (function () {
    function TimerService(_dataService, _notificationService) {
        var _this = this;
        this._dataService = _dataService;
        this._notificationService = _notificationService;
        this.runningTime$ = new angular2_1.Observable(function (observer) { return _this._timerObserver = observer; });
        this.runningTime$.subscribe();
        this.stopTimer();
    }
    TimerService.prototype.startTimer = function (time) {
        if (this.clockRunning) {
            this.stopTimer();
        }
        else {
            this._startTimer(time);
            this._selectedTime = time;
            this.focusRunning = true;
        }
    };
    TimerService.prototype.stopTimer = function () {
        clearInterval(this._interval);
        this._runningTime = new Date();
        this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(0);
        this._timerObserver.next(this._runningTime);
        this.clockRunning = false;
    };
    TimerService.prototype._startTimer = function (mins) {
        var _this = this;
        this.clockRunning = true;
        this._runningTime.setMinutes(mins);
        this._runningTime.setSeconds(1); // test until ready for mins
        this._interval = setInterval(function () {
            if (_this._timerFinished()) {
                _this.stopTimer();
                _this._saveTime();
            }
            else {
                _this._runningTime = new Date(_this._runningTime.getTime() - 1000);
            }
            _this._timerObserver.next(_this._runningTime);
        }, 1000);
    };
    TimerService.prototype._timerFinished = function () {
        return (this._runningTime.getSeconds() === 0 && this._runningTime.getMinutes() === 0);
    };
    TimerService.prototype._saveTime = function () {
        var phaseType = null;
        var message = null;
        switch (this._selectedTime) {
            case 1:
                phaseType = interfaces_1.PhaseType.FOCUS;
                message = 'Focus Phase Complete!';
                break;
            case 5:
                phaseType = interfaces_1.PhaseType.SHORT_BREAK;
                message = 'Short Break Complete!';
                break;
            case 15:
                phaseType = interfaces_1.PhaseType.LONG_BREAK;
                message = 'Long Break Complete!';
                break;
            default:
                phaseType = interfaces_1.PhaseType.CUSTOM_BREAK;
                message = 'Custom Brake Complete!';
                break;
        }
        this._dataService.addFocusPhase({ phaseType: phaseType, dateCreated: Firebase.ServerValue.TIMESTAMP });
        this._notificationService.openNotification(message);
    };
    TimerService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [data_service_1.DataService, notification_service_1.NotificationService])
    ], TimerService);
    return TimerService;
})();
exports.TimerService = TimerService;
