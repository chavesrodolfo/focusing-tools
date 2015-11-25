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
var TimerService = (function () {
    function TimerService() {
        this._stopTimer();
    }
    TimerService.prototype.startFocus = function (time) {
        if (this.clockRunning) {
            this._stopTimer();
        }
        else {
            this._startTimer(1);
            this.focusRunning = true;
        }
    };
    TimerService.prototype._stopTimer = function () {
        clearInterval(this._interval);
        document.title = 'Focus Timer';
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this.clockRunning = false;
    };
    TimerService.prototype._startTimer = function (mins) {
        var _this = this;
        this.clockRunning = true;
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(mins + 1);
        this._interval = setInterval(function () {
            if (_this.runningTime.getSeconds() === 0 && _this.runningTime.getMinutes() === 0) {
                _this._stopTimer();
            }
            else {
                _this.runningTime = new Date(_this.runningTime.getTime() - 1000);
                // Refactor to use DOM Adapter once ng2 fixed
                document.title = _this.runningTime.getMinutes() + ":" + _this.runningTime.getSeconds();
            }
        }, 1000);
    };
    TimerService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TimerService);
    return TimerService;
})();
exports.TimerService = TimerService;
