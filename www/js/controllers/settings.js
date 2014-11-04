'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl', function($scope, $window, userService, locationService, $ionicPopup) {
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
				$window.navigator.geolocation.watchPosition(function(position) {
					locationService.getZipCode(position);					
	  				if (locationService.newZip != locationService.oldZip && locationService.oldZip != null){
	  					alert("New zip code!");
	  					locationService.oldZip = locationService.newZip;
	  				}
				}, function(error) {
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


	$scope.logout = function() {
		var confirmPopup = $ionicPopup.confirm({
     		title: 'Logout of Cityzen',
     		template: 'Are you sure you want to logout?'
   		});
   		
   		confirmPopup.then(function(res) {
     		if(res) {

       			
       			localStorage.clear();

       			$window.location.href = '/';

       			//other stuff
     		} else {
       			//do nothing.
     		}
   		});
		
	}

});

	



