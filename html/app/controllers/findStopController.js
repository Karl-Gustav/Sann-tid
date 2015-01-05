'use strict';

angular.module('app').controller("findStopController", function($scope, findPlaceResource, $location){
    $scope.name = $location.search().query
    $scope.search = function(){
        $location.search('query', $scope.name)
        findPlaceResource.query({placeName: $location.search().query}, function(data){
            $scope.data = data
        }, function(error){
            $scope.error = error
            $log.error("Find stop query failed:", error)
        })
    }
})
