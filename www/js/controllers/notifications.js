app.controller('NotificationsCtrl', function($scope, $window, userService, notificationService) {

	$scope.notifications = null;

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


	$scope.openNotifURL = function(URL, ID) {
		console.log(URL)
		for (var i = 0 ; i < userService.settings.history.length; i++){
			var notif = userService.settings.history[i];
			if (notif.id == ID){

				userService.settings.history[i].read = 1;
			}
		}
		var authURL = "http://cityzenapp.us/core/mobile/";
		var phpFile = "auth.php";
		var userID = localStorage.getItem('userID');
		var newWindow = window.open(authURL + phpFile + '?userID=' + userID, '_blank', 'location=yes');
		newWindow.addEventListener('loadstop', function(){
			console.log('loadstop');
			console.log(URL)
			newWindow.executeScript({
				code: "window.location.href = '" + URL +"'"
			})
		})
		return false;
	}
});