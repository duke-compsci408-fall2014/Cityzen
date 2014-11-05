'use strict';


app.controller('loginCtrl', function($scope, $window, $ionicPopup, userService) {

	//example code
	$scope.login = function () {
		console.log("begin login");
		var username = document.getElementById('username').value
		var password = document.getElementById('password').value
		var success = userService.login(username, password);
		if (!success){
			var loginFail = $ionicPopup.alert({
     			title: 'Login Fail',
     			template: 'You have entered an incorrect username and/or password'
   			});
   		
   			loginFail.then(function(res) {
     			document.getElementById('username').value = '';
       			document.getElementById('password').value = '';
       			
   			});
		}
		else{
			localStorage.setItem("username", username);
			localStorage.setItem("password", password)
			console.log("username: " + localStorage.getItem("username"));
			console.log("password: " + localStorage.getItem("password"));
			window.location.href = "#/tab/polls";
		}

	}


});