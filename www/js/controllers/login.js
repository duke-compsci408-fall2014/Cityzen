'use strict';


app.controller('loginCtrl', function($scope, $window, $ionicPopup, $ionicLoading, $timeout, userService, notificationService) {

	var NONCE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"

	/*
	* if user is already logged in on device:
	* get user information from localStorage
	* skip login page, jump to polls
	*/
	if(localStorage.getItem("userID") != null){
		userService.userID = localStorage.getItem("userID");
		if (localStorage.getItem(userService.userID) != null){
			userService.settings = JSON.parse(localStorage.getItem(userService.userID));
			console.log(userService.settings.history)
		}
		else{
			userService.resetDefaultSettings(); //cannot find user, restore default settings
		}
		notificationService.start(); //load previous notifications and begin listening for new notifications
		window.location.href = "#/tab/polls";
	}

	/*
	* Event fires when user accesses mobile application from another application using the Cityxzen URI
	*/
	$window.addEventListener('cityzenURI', function(e) {
        var url = e.detail.url;
        var parser = document.createElement('a');
        parser.href = url;
        var split_search = parser.search.split("=");
        var connection_token = split_search[split_search.length-1];
        userService.getSocialProfile(connection_token, NONCE ).then(function(res) {
        	var user_token = res.data.response.result.data.user.user_token;
        	$scope.response = user_token;

        	userService.getUserIdFromToken(user_token).then(function(response){
        		$ionicLoading.hide();
        		$scope.response= response.data;
        		loginWithUserID(response.data);
        	});

        });

      });

	/*
	* login with username and password, i.e., Cityzen account
	*/
	$scope.login = function () {
		console.log("begin login");
		$scope.showLogin();
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		//authenticate username and password
		userService.authenticate(username, password, loginWithUserID);		
	}

	/*
	* callback from userService.authenticate
	* Login once userToken has been attained and validatied
	* data: user's userToken from either OneAll or Cityzen database
	*/
	var loginWithUserID = function(data){
		$scope.hideLogin();
		//get userToken from data
		var userToken = parseInt(data);
		userService.userID = userToken;

		if (userToken == -1){
		//invalid token
			var loginFail = $ionicPopup.alert({
     			title: 'Login Fail',
     			template: 'You have entered an incorrect username and/or password'
   			});
   		
   			loginFail.then(function(res) {
     			document.getElementById('username').value = '';
       			document.getElementById('password').value = '';
       			
   			});
		}
		else if (userToken == 0){
		//connection failure
			var loginFail = $ionicPopup.alert({
     			title: 'Unable to Login',
     			template: 'You are currently not connected to the internet. Please try again later.'
   			});
		}
		else{
		//login success
			localStorage.setItem("userID", userToken);
			if(localStorage.getItem(userToken)){
				//if user has logged in previously on the device, get user info
				userService.settings = JSON.parse(localStorage.getItem(userToken))
			}
			else{
				//else load default settings
				userService.resetDefaultSettings();
			}
			notificationService.start(); //load previous notifications and begin listening for new notifications
			window.location.href = "#/tab/polls"; //load polls page
		}
	}

	/*
	* Begin register
	*/
	$scope.showRegisterDialog = function(){
		console.log("begin register");
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<div>Your Username: </div> <input type="text" ng-model="data.regus"> <div>Your Password: </div> <input type="password" ng-model="data.regps"> <div>Your Email Address (optional): </div> <input type="text" ng-model="data.regem">',
		  	title: 'Enter New User Information',
		  	subTitle: 'Please provide a username, password, and email. Your email address will only be used for password recovery purposes. No spam!',
		  	scope: $scope,
		    	buttons: [
		      	{ text: 'Cancel' },
		      	{
		        	text: '<b>Register</b>',
		        	type: 'button-positive',
		        	onTap: function(e) {
		          	if ((!$scope.data.regus) || (!$scope.data.regps)) {
		            	//don't allow the user to close unless he enters all three values
		            	e.preventDefault();
		          	} else {
		          		$scope.showRegister();
		          		//register with data entered by user
		            	userService.register($scope.data.regus, $scope.data.regps, $scope.data.regem, $scope.registerNewUser);
		          	}
		        }
		      },
		    ]
		  });
	}

	/*
	* callback from userServer.register
	* logs user in with new userToken
	*/
	$scope.registerNewUser = function (data) {
		//get userTokeb
		var userToken = parseInt(data);	
		$scope.hideRegister();

		if (userToken == -1){
		//failed registration: invalid username
			var loginFail = $ionicPopup.alert({
     			title: 'Registeration Failed',
     			template: 'The Given Username is Already Registered'
   			});
		}
		else if (userToken == -2){
		//failed registration: invalid email
			var loginFail = $ionicPopup.alert({
     			title: 'Registeration Failed',
     			template: 'The Given Email is Already Registered'
   			});
		}
		else if (userToken == 0){
		//faile registration: connection failure
			var loginFail = $ionicPopup.alert({
     			title: 'Unable to Register',
     			template: 'You are currently not connected to the internet. Please try again later.'
   			});
		}
		else{
		//successful registration
			userService.userID = userToken;
			localStorage.setItem("userID", userToken);
			window.location.href = "#/tab/polls"; //load polls page
		}
	}

	/*
	* login with social media using OneAll
	*/
	$scope.socialLogin = function(provider) {
		$ionicLoading.show({template: "Loading..."});
		var platform = device.platform; //iOS or Android
		var URI = "";
		if (platform == "iOS") {
			URI = "cityzen://";
		}
		if (platform == "Android") {
			URI = "http://cityzen319295.ionicframework.com/cityzen";
		}

		var URL = "https://cityzen.api.oneall.com/socialize/connect/mobile/"+provider+"/?nonce=" + NONCE + "&callback_uri="+URI;
		var ref = window.open(URL, '_system', 'location=yes');

		return false;
	}

	/*
	*  Ionic feature: show load message
	*/
	$scope.showLogin = function(){
		$ionicLoading.show({
			template: 'Attempting to Log In...',
		});
	};

	/*
	* Ionic feature: hide load message
	*/
	$scope.hideLogin = function(){
		$ionicLoading.hide();
	};

	/*
	* Ionic feature: show load message
	*/
	$scope.showRegister = function(){
		$ionicLoading.show({
			template: 'Attempting to Register New User...',
		});
	};

	/*
	* Ionic feature: hide load message
	*/
	$scope.hideRegister = function(){
		$ionicLoading.hide();
	};   	

});