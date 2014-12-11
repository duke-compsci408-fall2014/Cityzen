'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl', function($scope, $window, userService, locationService, notificationService, $ionicPopup) {
	console.log("SettingsCtrl");


	//get persisted settings
	$scope.settings = userService.settings;
	$scope.watchId;
	

	$scope.toggleNotifications = function() {
		userService.settings.notifications.areOn = !userService.settings.notifications.areOn;
		console.log("toggling notifs");

		localStorage.setItem(userService.userID, JSON.stringify(userService.settings));
	}

	$scope.toggleGPSNotifications = function() {
		userService.settings.notifications.gpsOn = !userService.settings.notifications.gpsOn;
		//turn on or off watchPosition
		if(userService.settings.notifications.gpsOn){
			//if GPS is enable, otherwise, notify
	  		if ($window.navigator.geolocation) {
				locationService.watchLocation($window.navigator.geolocation);
			}
			else{
				var alertLocationDisabled = $ionicPopup.alert({
	     			title: 'GPS is not enabled on your device',
	    			template: 'Cityzen is unable to send GPS notifications'
	   				});
	   			alertLocationDisabled.then(function(res) {
	  			});
			}
		}
		else{
			if (locationService.watchId){
				$window.navigator.geolocation.clearWatch(locationService.watchId);
				locationService.watchId = null;
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

		localStorage.setItem(userService.userID, JSON.stringify(userService.settings));
	}

	$scope.logout = function() {
		var confirmPopup = $ionicPopup.confirm({
     		title: 'Logout of Cityzen',
     		template: 'Are you sure you want to logout?'
   		});
   		
   		confirmPopup.then(function(res) {
     		if(res) {
       			localStorage.clear();
       			var userData = JSON.stringify(userService.settings);
       			localStorage.setItem(userService.userID, userData);
       			console.log(userService.userID);
       			userService.resetDefaultSettings();
       			userService.logout();
       			$window.location.href = '';
       			//other stuff
     		} else {
       			//do nothing.
     		}
   		});
		
	}

});