System.register(['angular2/angular2', 'app/components/focus-phase.component', 'app/services/data.service', 'app/services/auth.service'], function(exports_1) {
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
    var angular2_1, focus_phase_component_1, data_service_1, auth_service_1;
    var Stats;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (focus_phase_component_1_1) {
                focus_phase_component_1 = focus_phase_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            Stats = (function () {
                function Stats(_authService, _dataService) {
                    var _this = this;
                    this._authService = _authService;
                    this._dataService = _dataService;
                    this._dataService.focusPhases$.subscribe(function (focusPhases) { return _this.focusPhases = focusPhases; });
                    this._dataService.loadFocusPhases();
                    this._authService.authUser$.subscribe(function (authUser) { return _this.authUser = authUser; });
                    this._authService.loadAuthUser();
                }
                Stats.prototype.login = function () {
                    this._authService.login();
                };
                Stats = __decorate([
                    angular2_1.Component({
                        selector: 'focus-stats',
                        templateUrl: 'build/app/stats.html?v=1447011007227?v=1447011005340?v=1447007533469?v=1447007455017?v=1447006997307?v=1447004935582?v=1447004848717?v=1447004738408?v=1447004722294?v=1447004700959?v=1447004678336?v=1447004657120?v=1447004554618?v=1447004525118?v=1447004241851?v=1447004117295?v=1447004081220?v=1447003619903',
                        directives: [angular2_1.CORE_DIRECTIVES, focus_phase_component_1.FocusPhaseCmp]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
                ], Stats);
                return Stats;
            })();
            exports_1("Stats", Stats);
        }
    }
});
