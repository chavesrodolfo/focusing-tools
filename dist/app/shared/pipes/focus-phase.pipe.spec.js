"use strict";
var testing_1 = require('@angular/core/testing');
var focus_phase_pipe_1 = require('./focus-phase.pipe');
testing_1.describe('FocusPhase Pipe', function () {
    testing_1.beforeEachProviders(function () { return [focus_phase_pipe_1.FocusPhasePipe]; });
    testing_1.it('should transform the input', testing_1.inject([focus_phase_pipe_1.FocusPhasePipe], function (pipe) {
        testing_1.expect(pipe.transform(true)).toBe(null);
    }));
});
//# sourceMappingURL=focus-phase.pipe.spec.js.map