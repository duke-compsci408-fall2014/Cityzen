'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl',function($scope, $window, userService) {
	console.log("SettingsCtrl");


	//get persisted settings
	$scope.settings = userService.settings;
	

	$scope.toggleNotifications = function() {
		userService.settings.notifications.areOn = !userService.settings.notifications.areOn;
		console.log("toggling notifs");
	}

	$scope.togglePushNotifications = function() {
		userService.settings.notifications.pushOn = !userService.settings.notifications.pushOn;
	}

	$scope.toggleGPSNotifications = function() {
		userService.settings.notifications.gpsOn = !userService.settings.notifications.gpsOn;
	}

	$scope.toggleCategory = function(id) {
		var categories = userService.settings.notifications.categories;
		for (var i = 0 ; i < categories.length ; i++) {
			var category = categories[i];
			if (category.id == id) {
				userService.settings.notifications.categories[i].selected = !category.selected;
				break;
			}
		}
		userService.settings.notifications.categories = categories;
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

	



