'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl',function($scope, $window, userService, locationService) {
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
		if(userService.settings.notifications.gpsOn){
	  		if (window.navigator.geolocation != null) {
				$window.navigator.geolocation.watchPosition(locationService.getZipCode, function(error) {
					console.log('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
				}, {timeout:5000});
			}
		}
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
});

	



