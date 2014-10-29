'use strict';


app.controller('loginCtrl', ['$scope', 'userService', function($scope, $window, userService) {
	//example code
	$scope.login = function () {
		console.log("begin login");
		var username = document.getElementById('username').value
		var password = document.getElementById('password').value
		var success = userService.login(username, password);
		if (!success){
			alert("username or password is incorrect");
		}
		else{
			localStorage.setItem("username", username);
			localStorage.setItem("password", password)
			console.log("username" + localStorage.getItem("username"));
			console.log("password" + localStorage.getItem("password"));
		}

	}
	$scope.logout = function() {
		localStorage.clear();
		//return to login page??
	}

}]);