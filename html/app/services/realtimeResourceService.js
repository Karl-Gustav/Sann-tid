'use strict';

angular.module('app').factory('realtimeResource', function ($resource) {
    return $resource('http://reis.trafikanten.no/ReisRest/RealTime/GetRealTimeData/:stopId', {},
        {
            query: { method: 'JSONP', isArray:true, params: {callback: 'JSON_CALLBACK'} }
        }
    );
});
