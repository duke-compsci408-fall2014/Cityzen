'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('PollsCtrl', ['$scope', 'pollService', '$ionicLoading','$timeout', function($scope, pollService, $ionicLoading, $timeout) {

	$scope.polls = null;
	
	pollService.getAllPolls(function(response){
		$scope.polls = response;
		$ionicLoading.hide();
	})

	$scope.openPollURL = function(URL) {

		var authURL = "http://cityzenapp.us/core/mobile/";
		var phpFile = "auth.php";
		var userID = localStorage.getItem('userID');
		var newWindow = window.open(authURL + phpFile + '?userID=' + userID, '_blank', 'location=yes');
		newWindow.addEventListener('loadstop', function(){
			console.log('loadstop');
			newWindow.executeScript({
				code: "window.location.href = '" + URL +"'"
			})
		})
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