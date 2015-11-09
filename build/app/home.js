System.register(['angular2/angular2', 'app/components/focus-timer.component', 'app/services/data.service', 'app/services/auth.service'], function(exports_1) {
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
    var angular2_1, focus_timer_component_1, data_service_1, auth_service_1;
    var Home;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (focus_timer_component_1_1) {
                focus_timer_component_1 = focus_timer_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(_dataService, _authService) {
                    this._dataService = _dataService;
                    this._authService = _authService;
                }
                Home.prototype.eventCompleted = function (phaseType) {
                    this._dataService.addFocusPhase({
                        phaseType: phaseType,
                        dateCreated: Firebase.ServerValue.TIMESTAMP
                    });
                };
                Home = __decorate([
                    angular2_1.Component({
                        selector: 'focus-home',
                        templateUrl: 'app/home.html',
                        directives: [focus_timer_component_1.FocusTimerCmp]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, auth_service_1.AuthService])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
