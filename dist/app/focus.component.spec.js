"use strict";
var testing_1 = require('@angular/core/testing');
var focus_component_1 = require('../app/focus.component');
testing_1.beforeEachProviders(function () { return [focus_component_1.FocusAppComponent]; });
testing_1.describe('App: Focus', function () {
    testing_1.it('should create the app', testing_1.inject([focus_component_1.FocusAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
    testing_1.it('should have as title \'focus works!\'', testing_1.inject([focus_component_1.FocusAppComponent], function (app) {
        testing_1.expect(app.title).toEqual('focus works!');
    }));
});
//# sourceMappingURL=focus.component.spec.js.map