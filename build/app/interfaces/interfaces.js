System.register([], function(exports_1) {
    var PhaseType;
    return {
        setters:[],
        execute: function() {
            (function (PhaseType) {
                PhaseType[PhaseType["POMIDORO"] = 0] = "POMIDORO";
                PhaseType[PhaseType["SHORT_BREAK"] = 1] = "SHORT_BREAK";
                PhaseType[PhaseType["LONG_BREAK"] = 2] = "LONG_BREAK";
            })(PhaseType || (PhaseType = {}));
            exports_1("PhaseType", PhaseType);
            ;
            ;
            ;
        }
    }
});
