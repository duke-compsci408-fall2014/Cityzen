'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', function($scope, pollService) {

	$scope.polls = pollService.getAllPolls();

	$scope.searchText = "";

}]);