'use strict';


app.controller('loginCtrl', function($scope, $window, $ionicPopup, userService) {

	//example code
	$scope.login = function () {
		console.log("begin login");
		var username = document.getElementById('username').value
		var password = document.getElementById('password').value
		var userToken = userService.login(username, password, getUserID);
		if (userToken == -1){
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
			localStorage.setItem("userID", userToken);
			console.log("userID: " + localStorage.getItem("userID"));
			window.location.href = "#/tab/polls";
		}

	}

	var getUserID = function(data){
		console.log('callback!');
		console.log('userId=' + data)
	}

	$scope.register = function(){
		console.log("begin register");
		var registerSuccess = $ionicPopup.alert({
     			title: 'Registration Successful'
   			});
   		
   			registerSuccess.then(function(res) {
       			window.location.href = "#/tab/polls";
   			});
   	}
});