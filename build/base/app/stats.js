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
        this.userSession = this._authService.userSession;
        this.focusPhases = this._dataService.focusPhases$;
        this._dataService.loadFocusPhases();
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
    Stats.prototype._createGraphData = function (phases) {
        var labels = [];
        var data = [];
        var today = new Date();
        phases.forEach(function (phase) {
            if (phase.phaseType === interfaces_1.PhaseType.FOCUS) {
                var date = new Date(phase.dateCreated);
                var formattedDate = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
                labels.push(formattedDate);
                console.log(phase.phaseType);
                data.push(phase.phaseType);
            }
        });
        // for (let i = 0; i < 7; i++) {
        //     let newDate = Date.now() + -i * 24 * 3600 * 1000;
        //     let date = new Date(newDate);
        //     let formattedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        //     labels.push(formattedDate);
        // }
        return {
            labels: labels,
            datasets: [
                {
                    label: "Focus",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "#d76450",
                    pointColor: "#d76450",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#d76450",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data
                }
            ]
        };
    };
    Stats.prototype._setUpHistory = function () {
        var _this = this;
        this._dataService.focusPhases$.subscribe(function (phases) {
            if (_this.chart && _this.chart.destroy) {
                _this.chart.destroy();
            }
            var data = _this._createGraphData(phases);
            var ctx = _this.canvas.nativeElement.getContext('2d');
            var options = {
                responsive: true
            };
            _this.chart = new Chart(ctx).Line(data, options);
        });
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
