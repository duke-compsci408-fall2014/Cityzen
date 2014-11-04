'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', '$ionicLoading', function($scope, pollService, $ionicLoading) {

	$scope.polls = null;

	pollService.getAllPolls(function(response) {
		$scope.polls = response;
		$scope.hide();
	});



	$scope.openPollURL = function(URL) {
		console.log(URL)
		window.open(URL, '_system', 'location=yes');
		return false;
	}

	$scope.show = function(){
		$ionicLoading.show({
			template: 'Loading...',
		});
	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

	$scope.searchText = "";
	$scope.show();

}]);