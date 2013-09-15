var app = angular.module("testApp", [])

app.service("issueService", ['$http', function($http){
    var urlBase = '/rest/1/issues'

	this.getIssues = function(){
	    return '[{"id": 2131, "name": "tsert"},{"id": 2131s, "name": "tdsert"}]'
	}
}])
