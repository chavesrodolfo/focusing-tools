System.register(['angular2/angular2', 'app/components/pom-timer', 'app/services/auth.service'], function(exports_1) {
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
    var angular2_1, pom_timer_1, auth_service_1;
    var Settings;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (pom_timer_1_1) {
                pom_timer_1 = pom_timer_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            Settings = (function () {
                function Settings(_authService) {
                    var _this = this;
                    this._authService = _authService;
                    this.displayName = 'Not signed in.';
                    this._authService.user$.subscribe(function (authUser) {
                        if (authUser !== null) {
                            _this.authUser = authUser;
                            _this.displayName = _this.authUser.twitter.displayName;
                        }
                    });
                    this._authService.loadUser();
                }
                Settings.prototype.login = function () {
                    this._authService.login();
                };
                Settings.prototype.logout = function () {
                    this._authService.logout();
                    this.displayName = 'Not signed in.';
                };
                Settings = __decorate([
                    angular2_1.Component({
                        selector: 'pom-settings',
                        templateUrl: 'build/app/settings.html?v=1446693966567?v=1446693828734?v=1446693750762?v=1446693746218?v=1446693689079?v=1446691304918?v=1446691161970?v=1446691078270?v=1446689243765?v=1446688990176?v=1446688945421?v=1446688826085?v=1446688794726?v=1446688648830',
                        directives: [pom_timer_1.PomTimer]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], Settings);
                return Settings;
            })();
            exports_1("Settings", Settings);
        }
    }
});
