"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angularfire2_1 = require('angularfire2');
var _1 = require('./app/');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.FocusAppComponent, [
    router_1.ROUTER_PROVIDERS,
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase('https://focus-app.firebaseio.com'),
    angularfire2_1.firebaseAuthConfig({
        provider: angularfire2_1.AuthProviders.Twitter,
        method: angularfire2_1.AuthMethods.Popup,
        remember: 'default',
        scope: ['email']
    })
]);
//# sourceMappingURL=main.js.map