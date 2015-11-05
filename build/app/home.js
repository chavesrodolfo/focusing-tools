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
    var Home;
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
            Home = (function () {
                function Home(_dataService, _authService) {
                    this._dataService = _dataService;
                    this._authService = _authService;
                }
                Home.prototype.eventCompleted = function (eventType) {
                    this._dataService.addPomodori({
                        eventType: eventType,
                        dateCreated: Firebase.ServerValue.TIMESTAMP
                    });
                };
                Home = __decorate([
                    angular2_1.Component({
                        selector: 'pom-home',
                        templateUrl: 'build/app/home.html?v=1446763428580?v=1446763422860?v=1446763415958?v=1446763409590?v=1446763391755',
                        directives: [pom_timer_1.PomTimer]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, auth_service_1.AuthService])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
