'use strict';

app.controller('SettingsCtrl', function($scope, $window, userService, locationService, notificationService, $ionicPopup) {

	//get persisted settings
	$scope.settings = userService.settings;
	
	/*
	* called by enable notifications switch
	* turns capacity for receiving notifications on and off
	*/
	$scope.toggleNotifications = function() {
		userService.settings.notifications.areOn = !userService.settings.notifications.areOn;
		localStorage.setItem(userService.userID, JSON.stringify(userService.settings)); //update settings in app and on device
	}

	/*
	* called by enable GPS switch
	* turns watch position on and off
	*/
	$scope.toggleGPSNotifications = function() {
		userService.settings.notifications.gpsOn = !userService.settings.notifications.gpsOn;
		//turn on or off watchPosition
		if(userService.settings.notifications.gpsOn){
			//if GPS is enabled, otherwise, notify
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
			//turns off watchPositions
			if (locationService.watchId){
				$window.navigator.geolocation.clearWatch(locationService.watchId);
				locationService.watchId = null;
			}
		}
	}

	/*
	* called by particular category switch given by id
	* updates user perferences
	*/
	$scope.toggleCategory = function(id) {
		var categories = userService.settings.notifications.categories;
		//find selected category and enable/disable
		for (var i = 0 ; i < categories.length ; i++) {
			var category = categories[i];
			if (category.id == id) {
				userService.settings.notifications.categories[i].selected = !category.selected;
				break;
			}
		}
		//update categories in app and on the device
		userService.settings.notifications.categories = categories;
		localStorage.setItem(userService.userID, JSON.stringify(userService.settings));
	}

	/*
	* Log user out of mobile app when logout button is selected
	*/
	$scope.logout = function() {
		//comfirmation popup
		var confirmPopup = $ionicPopup.confirm({
     		title: 'Logout of Cityzen',
     		template: 'Are you sure you want to logout?'
   		});
   		
   		confirmPopup.then(function(res) {
     		if(res) {
     			//clear userID from localStorage, indicating user is not logged in
       			localStorage.removeItem('userID');
       			//update user information in localStorage
       			var userData = JSON.stringify(userService.settings);
       			localStorage.setItem(userService.userID, userData);
       			userService.logout();	//log user out
       			$window.location.href = ''; //return to login page
     		} else {
       			//do nothing.
     		}
   		});		
	}
});