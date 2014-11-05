'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', '$ionicLoading','$timeout', function($scope, pollService, $ionicLoading, $timeout) {

	$scope.polls = null;

	$scope.$watch(function(){
		return pollService.cache.polls;
	}, 
	function(newValue, oldValue) {
		if ($scope.polls == null) {
			$ionicLoading.hide();
		}
		$scope.polls = pollService.cache.polls;

	}, pollService.pollListEquality);

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