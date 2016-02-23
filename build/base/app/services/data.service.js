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
var Observable_1 = require('rxjs/Observable');
var auth_service_1 = require('./auth.service');
var DataService = (function () {
    function DataService(_authService) {
        var _this = this;
        this._authService = _authService;
        this.focusPhases$ = new Observable_1.Observable(function (observer) { return _this._focusPhasesObserver = observer; }).share();
        this.focusPhases$.subscribe();
        this._firebaseRef = new Firebase('https://focus-app.firebaseio.com/');
        this._authService.authUser$.subscribe(function (authUser) {
            _this._authUser = authUser;
            _this.loadFocusPhases();
        });
        this._authService.loadAuthUser();
    }
    DataService.prototype.loadFocusPhases = function () {
        var _this = this;
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child("users/" + this._authUser.uid + "/focusPhases").on('value', function (snapshot) {
                _this._focusPhasesObserver.next(_this._firebaseArrayToArray(snapshot.val()));
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code);
            });
        }
        else {
            this._focusPhasesObserver.next([]);
        }
    };
    DataService.prototype.addFocusPhase = function (focusPhase) {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child("users/" + this._authUser.uid + "/focusPhases").push(focusPhase);
        }
    };
    DataService.prototype._firebaseArrayToArray = function (fbArray) {
        var convertedArray = [];
        for (var property in fbArray) {
            if (fbArray.hasOwnProperty(property)) {
                convertedArray.push(fbArray[property]);
            }
        }
        return convertedArray;
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
