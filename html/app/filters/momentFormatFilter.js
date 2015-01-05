'use strict';

angular.module('app').filter('momentFormat', function(){
    return function(momentInstance, format){
        return momentInstance.format(format)
    }
})
