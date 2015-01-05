'use strict';

angular.module('app').filter('prettyPrintDiffPast', function(dateService){
    return function(momentInstance){
        var secAndMin = dateService.momentToMinutesAndSeconds(momentInstance),
            minutes = Math.abs(secAndMin[0]),
            seconds = Math.abs(secAndMin[1])
        if (minutes == 0){
            return seconds + " sekunder"
        } else if (minutes > -5) {
            return "{1} min {2} sek".assign(minutes, seconds)
        } else if (minutes > -20) {
            return minutes + " minutter"
        } else {
            return momentInstance.format('HH:mm')
        }
    }
})
