'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', function($scope, pollService) {

	$scope.polls = null;

	pollService.getAllPolls(function(response) {
		$scope.polls = response;
	});



	
	$scope.searchText = "";

}]);