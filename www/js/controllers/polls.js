'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', function($scope, pollService) {

	$scope.polls = null;

	pollService.getAllPolls(function(response) {
		$scope.polls = response;
	});

	$scope.openPollURL = function(URL) {
		console.log(URL)
		window.open(URL, '_system', 'location=yes');
		return false;
	}

	
	$scope.searchText = "";

}]);