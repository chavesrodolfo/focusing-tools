System.register(['angular2/angular2', 'app/components/pom-timer', 'app/services/data.service', 'app/services/auth.service'], function(exports_1) {
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
    var angular2_1, pom_timer_1, data_service_1, auth_service_1;
    var Stats;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (pom_timer_1_1) {
                pom_timer_1 = pom_timer_1_1;
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
                    this.displayName = 'Not signed in.';
                    this.pomodori = [];
                    if (this._authService.isLoggedIn()) {
                        this.displayName = this._authService.userSession.twitter.displayName;
                        this.displayImage = this._authService.userSession.twitter.profileImageURL;
                        this._dataService.pomodori$.subscribe(function (val) { return _this.pomodori = val; });
                        this._dataService.loadPomodori();
                    }
                }
                Stats.prototype.login = function () {
                    this._authService.login();
                };
                Stats.prototype.logout = function () {
                    this._authService.logout();
                    this.displayName = 'Not signed in.';
                };
                Stats = __decorate([
                    angular2_1.Component({
                        selector: 'pom-stats',
                        templateUrl: 'app/stats.html',
                        directives: [angular2_1.CORE_DIRECTIVES, pom_timer_1.PomTimer]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
                ], Stats);
                return Stats;
            })();
            exports_1("Stats", Stats);
        }
    }
});
