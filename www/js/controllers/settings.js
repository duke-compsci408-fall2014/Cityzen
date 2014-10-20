'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl',function($scope, $window, userService) {
	console.log("SettingsCtrl");


	//find notification settings:
	$scope.notifications = userService.settings.notifications.areOn;

	//GPS enabled?
	$scope.geolocation = userService.settings.notifications.gpsOn;

	//retrieve firstname from state
	$scope.first_name = userService.settings.user.first_name;
	$scope.last_name = userService.settings.user.last_name;

	$scope.address = userService.settings.user.address;

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


});

	



