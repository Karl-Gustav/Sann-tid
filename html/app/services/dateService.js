'use strict';

angular.module('app').service('dateService', function() {
    this.aspNetDateToMoment = function(aspNetDate){
        return moment(aspNetDate)
    };
    this.diffInMinutes = function(timeInTheFuture){
        var now = moment()
        return timeInTheFuture.diff(now, 'minutes')
    }
    this.diffInSeconds = function(timeInTheFuture){
        var now = moment()
        return timeInTheFuture.diff(now, 'seconds')
    }
    this.momentToMinutesAndSeconds = function(momentTime){
        var seconds = momentTime.diff(moment(), 'seconds'),
            minutes = ~~(seconds / 60),
            remainingSeconds = seconds % 60;
        return [minutes, remainingSeconds]
    }
});
