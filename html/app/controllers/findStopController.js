'use strict';

angular.module('app').controller("findStopController", function($scope, findPlaceResource, $location, $log){
    $scope.searchString = $location.search().query;
    $scope.search = search;

    if ($location.search().query) {
        search();
    }

    $scope.$watch('searchString', function (newVal, oldVal) {
        $location.search('query', newVal);
    })

    $scope.$on('$routeUpdate', search);

    function search () {
        if ($location.search().query && $location.search().query.length > 0) {
            findPlaceResource.query({placeName: $location.search().query}, function(data){
                $scope.data = data
            }, function(error){
                $scope.error = error
                $log.error("Find stop query failed:", error)
            })
        }
    }
})
