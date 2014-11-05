app.controller('NotificationsCtrl', function($scope, $window, userService, notificationService) {

	$scope.notifications = null;

	$scope.$watch(function(){
		return notificationService.cache.notifications;
	}, 
	function(newValue, oldValue) {
		if ($scope.notifications != null) {
			var lastIndex = newValue.length-1;
			var newNotif = newValue[lastIndex];
			notificationService.addNotification(newNotif.title, newNotif.description);
			//we should also pass in other information but I don't want to change
			//the method signature at this moment. 
		}

		$scope.notifications = notificationService.cache.notifications;
		

	}, notificationService.notificationListEquality);


	$scope.openNotifURL = function(URL) {
		console.log(URL)
		window.open(URL, '_system', 'location=yes');
		return false;
	}
});