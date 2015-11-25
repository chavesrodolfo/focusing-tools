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
var data_service_1 = require('./data.service');
var interfaces_1 = require('../interfaces/interfaces');
var TimerService = (function () {
    function TimerService(_dataService) {
        var _this = this;
        this._dataService = _dataService;
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
        this.clockRunning = false;
    };
    TimerService.prototype._startTimer = function (mins) {
        var _this = this;
        this.clockRunning = true;
        this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(mins + 1);
        this._interval = setInterval(function () {
            if (_this._runningTime.getSeconds() === 0 && _this._runningTime.getMinutes() === 0) {
                _this.stopTimer();
                switch (_this._selectedTime) {
                    case 1:
                        _this._saveTime(interfaces_1.PhaseType.POMIDORO);
                        break;
                    case 5:
                        _this._saveTime(interfaces_1.PhaseType.SHORT_BREAK);
                        break;
                    case 15:
                        _this._saveTime(interfaces_1.PhaseType.LONG_BREAK);
                        break;
                    default:
                        _this._saveTime(interfaces_1.PhaseType.CUSTOM_BREAK);
                        break;
                }
            }
            else {
                _this._runningTime = new Date(_this._runningTime.getTime() - 1000);
            }
            _this._timerObserver.next(_this._runningTime);
        }, 1000);
    };
    TimerService.prototype._saveTime = function (phaseType) {
        this._dataService.addFocusPhase({
            phaseType: phaseType,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    };
    TimerService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], TimerService);
    return TimerService;
})();
exports.TimerService = TimerService;
