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
                        templateUrl: 'build/app/home.html?v=1447026981569?v=1447026477888?v=1447026454658?v=1447026389556?v=1447026348834?v=1447026134675?v=1447023781135?v=1447023562848?v=1447023478599?v=1447023434068?v=1447023425838?v=1447022833075?v=1447022821868?v=1447022524835?v=1447022345278?v=1447022320358?v=1447021839434?v=1447021589568?v=1447021401968?v=1447021356701?v=1447021296616?v=1447011007227?v=1447011005340?v=1447007533469?v=1447007455017?v=1447006997307?v=1447004935582?v=1447004848717?v=1447004738408?v=1447004722294?v=1447004700959?v=1447004678336?v=1447004657120?v=1447004554618?v=1447004525118?v=1447004241851?v=1447004117295?v=1447004081220?v=1447003619903',
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
