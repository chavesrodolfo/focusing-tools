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
var core_1 = require('angular2/core');
var focus_phase_component_1 = require('./components/focus-phase.component');
var data_service_1 = require('./services/data.service');
var interfaces_1 = require('./interfaces/interfaces');
var auth_service_1 = require('./services/auth.service');
var Stats = (function () {
    function Stats(_authService, _dataService) {
        this._authService = _authService;
        this._dataService = _dataService;
    }
    Stats.prototype.ngOnInit = function () {
        var _this = this;
        this.focusPhases = this._dataService.focusPhases$;
        this._dataService.loadFocusPhases();
        this.authUser = this._authService.authUser$;
        // this._authService.loadAuthUser();
        setTimeout(function () { return _this._authService.loadAuthUser(); }, 0); // hack need to fix
    };
    Stats.prototype.ngAfterViewInit = function () {
        this._setUpHistory();
    };
    Stats.prototype.loginTwitter = function () {
        this._authService.login(interfaces_1.AuthType.TWITTER);
    };
    Stats.prototype.loginGithub = function () {
        this._authService.login(interfaces_1.AuthType.GITHUB);
    };
    Stats.prototype._setUpHistory = function () {
        var _this = this;
        var labels = [];
        var today = new Date();
        for (var i = 0; i <= 7; i++) {
            var newDate = Date.now() + -i * 24 * 3600 * 1000; // date 5 days ago in milliseconds UTC
            labels.push(new Date(newDate).toUTCString());
        }
        var data = {
            labels: labels,
            datasets: [
                {
                    label: "Focus",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "#d76450",
                    pointColor: "#d76450",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        setTimeout(function () {
            var ctx = _this.canvas.nativeElement.getContext('2d');
            var options = {
                responsive: true
            };
            var myLineChart = new Chart(ctx).Line(data, options);
        }, 0);
    };
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', Object)
    ], Stats.prototype, "canvas", void 0);
    Stats = __decorate([
        core_1.Component({
            selector: 'focus-stats',
            templateUrl: 'app/stats.html',
            directives: [focus_phase_component_1.FocusPhaseCmp]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
    ], Stats);
    return Stats;
}());
exports.Stats = Stats;
