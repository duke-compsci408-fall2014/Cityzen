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
	}

	$scope.toggleGPSNotifications = function() {
		userService.settings.notifications.gpsOn = !userService.settings.notifications.gpsOn;
		//turn on or off watchPosition
		if(userService.settings.notifications.gpsOn){
			//if GPS is enable, otherwise, notify
	  		if (window.navigator.geolocation) {
				$scope.watchId = $window.navigator.geolocation.watchPosition(function(position) {
					oldZip = localStorage.getItem("zip");
					locationService.getZipCode(position);					
	  				if (localStorage.getItem("zip") != oldZip && oldZip != null){
	  					notificationService.addNotification("New zip code!", "You have entered a new location");
	  				}
				}, function(error) {
					console.log('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
				}, {timeout:5000});
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
			$window.navigator.geolocation.clearWatch(watchId);
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
       			var userData = JSON.stringify(userService.settings);
       			localStorage.setItem(userService.userID, userData);
       			$window.location.href = '';
       			//other stuff
     		} else {
       			//do nothing.
     		}
   		});
		
	}

});