angular.module('app').config(function($routeProvider){
    $routeProvider
        .when('/',{
            controller: "findStopController",
            templateUrl: "partials/chooseStop.html",
            reloadOnSearch: false
        })
        .when('/showRealtime/:stopId',{
            controller: "realtimeController",
            templateUrl: "partials/showRealtime.html"
        })
        .otherwise({redirectTo: "/"})
})
