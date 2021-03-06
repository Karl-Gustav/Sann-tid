'use strict';

angular.module('app').filter('prettyPrintDiffFuture', function(dateService){
    return function(momentInstance){
        var secAndMin = dateService.momentToMinutesAndSeconds(momentInstance),
            minutes = secAndMin[0],
            seconds = secAndMin[1]
        if (minutes == 0){
            return seconds + " sekunder"
        } else if (minutes < 5) {
            return minutes + " min " + seconds + " sek"
        } else if (minutes < 20) {
            return minutes + " minutter"
        } else {
            return momentInstance.format('HH:mm')
        }
    }
})
