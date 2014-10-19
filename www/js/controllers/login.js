'use strict';


app.controller('loginCtrl', ['$scope', 'userService', function($scope, userService) {

	//example code
	$scope.login = function () {
		userService.login();
	}


}]);