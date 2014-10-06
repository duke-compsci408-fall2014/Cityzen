'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl', function($scope, $window) {
	console.log("SettingsCtrl");

	//
	$scope.isEditing = false;

	//find notification settings:
	$scope.notifications = false;

	//GPS enabled?
	$scope.geolocation - false;

	//retrieve firstname from state
	$scope.first_name = "Will";
	$scope.last_name = "Smith";

	$scope.address = "505 Main, New York, NY";

	$scope.toggleNotifications = function() {
		$scope.notifications = !$scope.notifications;
		console.log("toggling notifs");
	}


	$scope.toggleGeolocation = function(){
		$scope.geolocation= !$scope.geolocation;
		console.log($scope.geolocation);
		if($scope.geolocation){
			$window.navigator.geolocation.getCurrentPosition(function(position){
				console.log("latitude: " + position.coords.latitude + "\nlongitude: " + position.coords.longitude);
			}, function(error) {
				console.log('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
			}, {timeout:5000});
		}
	}


}]);

	



