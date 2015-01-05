'use strict';

angular.module('app').controller("realtimeController", function($scope, $routeParams, $interval, realtimeResource, dateService, $log){
    var interval
    $scope.stopName = $routeParams.stopName
    $scope.refresh = function(){
        $scope.updateTime = moment()
        realtimeResource.query({stopId: $routeParams.stopId}, function(data){
            if (data.length == 0) {
                $scope.error = "Ruter har ingen avganger ifra dette stoppet for øyeblikket. Dette kan " +
                "være på grunn av tidspunktet (send på kvelden) eller at dette stoppet aldri har avganger. " +
                "Uansett så bør du gå tilbake og søke opp et annet stopp."
            }
            data.each(function(el){
                el.ExpectedDepartureTime = dateService.aspNetDateToMoment(el.ExpectedDepartureTime)
            })
            $scope.data = data
            $scope.updateTime = moment()
            $scope.color = ""
        }, function(error){
            $scope.error = error
            $log.error("Refresh query failed:", error)
        })
    }
    $scope.refresh()

    interval = $interval(function(){
        var now = moment(),
            secondsSinceUpdate = now.diff($scope.updateTime, 'seconds')

        if (secondsSinceUpdate >= 30) $scope.color = "Yellow"

        if (secondsSinceUpdate >= 180) $scope.refresh()
    }, 500)

    $scope.$on('$destroy', function () {
        $interval.cancel(interval)
        $log.debug("destoryed the interval:", interval)
    })
})
