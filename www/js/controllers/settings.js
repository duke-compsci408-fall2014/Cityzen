'use strict';

//var app = angular.module('cityzen', ['ionic'])
app.controller('SettingsCtrl', ['$scope', function($scope) {
	console.log("SettingsCtrl");


	//
	$scope.isEditing = false;

	//find notification settings:
	$scope.notifications = false;

	//retrieve firstname from state
	$scope.first_name = "Will";
	$scope.last_name = "Smith";

	$scope.address = "505 Main, New York, NY";

	$scope.toggleNotifications = function() {
		$scope.notifications = !$scope.notifications;
		console.log("toggling notifs");
	}


}]);