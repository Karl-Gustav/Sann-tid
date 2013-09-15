var app = angular.module('testApp')

app.controller("issuesController", function($scope){
	$scope.name = "test"
})

app.factory("issuesFactory", function($scope){
    return {
		get: function(){
			return [{"id": 2131, "name": "tsert"},{"id": 2131, "name": "tdsert"}]
		}
	}
})
