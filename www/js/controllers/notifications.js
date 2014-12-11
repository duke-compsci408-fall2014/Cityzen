app.controller('NotificationsCtrl', function($scope, $window, userService, notificationService) {

	$scope.notifications = null; //list of notifications held by scope, accessed by index.html

	//updates UI to display changes in notifications list
	$scope.$watch(function(){ 
		return userService.settings.history;
	}, 
	function(newValue, oldValue) {

		if ($scope.notifications != null && newValue.length > oldValue.length) {
			console.log("the watcher thinks the notifs have changed");
			var newNotif = newValue[0];

			//we should also pass in other information but I don't want to change
			//the method signature at this moment. 
		} else {
			$scope.notifications = userService.settings.history;
		}

	}, notificationService.notificationListEquality);

	/*
	* Open notification page when selected
	* autheticate user with auth.php
	* redirect to notification URL given by URL
	* mark selected notification, given by ID, as read
	*/
	$scope.openNotifURL = function(URL, ID) {
		//mark selected notification as read
		for (var i = 0 ; i < userService.settings.history.length; i++){
			var notif = userService.settings.history[i];
			if (notif.id == ID){
				userService.settings.history[i].read = 1;
			}
		}
		//authenticate with auth.php
		var authURL = "http://cityzenapp.us/core/mobile/";
		var phpFile = "auth.php";
		var userID = localStorage.getItem('userID');
		//open inAppBrowser
		var newWindow = window.open(authURL + phpFile + '?userID=' + userID, '_blank', 'location=yes');
		var loaded = false; //prevents page from reloading multiple times
		newWindow.addEventListener('loadstop', function(){
			console.log('loadstop');
			if(!loaded){
				newWindow.executeScript({
					code: "window.location.href = '" + URL +"'" //redirect to notification URL
				});
				loaded = true;
			}
		})
		return false;
	}
});