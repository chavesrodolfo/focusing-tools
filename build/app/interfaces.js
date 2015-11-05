System.register([], function(exports_1) {
    var EventType;
    return {
        setters:[],
        execute: function() {
            (function (EventType) {
                EventType[EventType["POMIDORO"] = 0] = "POMIDORO";
                EventType[EventType["SHORT_BREAK"] = 1] = "SHORT_BREAK";
                EventType[EventType["LONG_BREAK"] = 2] = "LONG_BREAK";
            })(EventType || (EventType = {}));
            exports_1("EventType", EventType);
            ;
            ;
            ;
        }
    }
});
