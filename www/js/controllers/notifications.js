app.controller('NotificationsCtrl', function($scope, $window, userService, notificationService) {

	$scope.notifications = null;

	$scope.$watch(function(){
		return notificationService.cache.notifications;
	}, 
	function(newValue, oldValue) {

		if ($scope.notifications != null && newValue.length > oldValue.length) {
			console.log("the watcher thinks the notifs have changed");
			var newNotif = newValue[0];

			//we should also pass in other information but I don't want to change
			//the method signature at this moment. 
		} else {
			$scope.notifications = notificationService.cache.notifications;
		}

	}, notificationService.notificationListEquality);


	$scope.openNotifURL = function(URL, ID) {
		console.log(URL)
		for (var i = 0 ;i < notificationService.cache.notifications.length; i++){
			var notif = notificationService.cache.notifications[i];
			if (notif.id == ID){

				notificationService.cache.notifications[i].read = 1;
			}
		}
		window.open(URL, '_system', 'location=yes');
		return false;
	}
});