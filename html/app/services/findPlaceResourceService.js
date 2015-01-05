'use strict';

angular.module('app').factory('findPlaceResource', function ($resource) {
    return $resource('http://reis.trafikanten.no/ReisRest/Place/FindMatches/:placeName', {},
        {
            query: { method: 'JSONP', isArray:true, params: {callback: 'JSON_CALLBACK'} }
        }
    );
});
