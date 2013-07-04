(function () {
    function et (h, m, s, ms) { return (ms||0) + 1000*((s||0) + 60*((m||0) + 60*(h||0))); }
    function ct (h, m, s, ms) { return (ms||0) + 5000*((s||0) + 60*((m||0) + 36*(h||0))); }
    CantrTicks.config([
        { id:"sailing", period:et( 3), times:[et( 0,45)], info:{ title:"Sea travel",     period:"Cantr hour" } },
        { id:"travel",  period:et( 3), times:[et( 1,10)], info:{ title:"Land travel",    period:"Cantr hour" } },
        { id:"project", period:et( 3), times:[et( 1,40)], info:{ title:"Project update", period:"Cantr hour" } },
        { id:"eating",  period:et(24), times:[et(14, 0)], info:{ title:"Eating",         period:"Cantr day" } },
        { id:"death",   period:et(24), times:[et(14,45)], info:{ title:"Starvation",     period:"Cantr day" } },
        { id:"animal",  period:et( 3), times:[et( 0, 5)], info:{ title:"Animal attack",  period:"Cantr hour" } }
    ]);
})();