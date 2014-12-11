'use strict';


app.controller('loginCtrl', function($scope, $window, $ionicPopup, $ionicLoading, $timeout, userService, notificationService) {

	var NONCE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"


	if(localStorage.getItem("userID") != null){
		userService.userID = localStorage.getItem("userID");
		console.log("check1")
		if (localStorage.getItem(userService.userID) != null){
			userService.settings = JSON.parse(localStorage.getItem(userService.userID));
			console.log(userService.settings.history)
		}
		else{
			userService.resetDefaultSettings();
		}
		notificationService.start();
		window.location.href = "#/tab/polls";
	}


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
        		$scope.response= response.data;
        		loginWithUserID(response.data);
        	});

        });

      });

	//example code
	$scope.login = function () {
		console.log("begin login");
		$scope.showLogin();
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		userService.authenticate(username, password, loginWithUserID);		
	}

	var loginWithUserID = function(data){
		$scope.hideLogin();
		var userToken = parseInt(data);
		console.log('callback!');
		userService.userID = userToken;
		console.log('userId=' + userToken)
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
		else if (userToken == 0){
			var loginFail = $ionicPopup.alert({
     			title: 'Unable to Login',
     			template: 'You are currently not connected to the internet. Please try again later.'
   			});
		}
		else{
			localStorage.setItem("userID", userToken);
			console.log("userID: " + localStorage.getItem("userID"));
			for (var i = 0; i < localStorage.length; i++){
			    console.log(localStorage.key(i));
			}
			if(localStorage.getItem(userToken)){
				userService.settings = JSON.parse(localStorage.getItem(userToken))
				console.log(userService.settings.history)
			}
			else{
				userService.resetDefaultSettings();
				console.log('reset')
			}
			notificationService.start();
			window.location.href = "#/tab/polls";
		}
	}

	$scope.skip = function() {
		window.location.href = "#/tab/polls";
	}

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
		            	userService.register($scope.data.regus, $scope.data.regps, $scope.data.regem, $scope.registerNewUser);
		          	}
		        }
		      },
		    ]
		  });
	}

	$scope.registerNewUser = function (data) {
		var userToken = parseInt(data);		
		console.log('callback!');
		$scope.hideRegister();
		if (userToken == -1){
			var loginFail = $ionicPopup.alert({
     			title: 'Registeration Failed',
     			template: 'The Given Username is Already Registered'
   			});
		}
		else if (userToken == -2){
			var loginFail = $ionicPopup.alert({
     			title: 'Registeration Failed',
     			template: 'The Given Email is Already Registered'
   			});
		}
		else if (userToken == 0){
			var loginFail = $ionicPopup.alert({
     			title: 'Unable to Register',
     			template: 'You are currently not connected to the internet. Please try again later.'
   			});
		}
		else{
			userService.userID = userToken;
			console.log('userId=' + userToken)
			localStorage.setItem("userID", userToken);
			console.log("userID: " + localStorage.getItem("userID"));
			if(localStorage.getItem(userToken) != null){
				userService.settings = JSON.parse(localStorage.getItem(userToken))
			}
			else{
				console.log("userId is null")
			}
			window.location.href = "#/tab/polls";
		}
	}



	var my_on_login_redirect = function(args) {
        alert("You have logged in with " + args.provider.name + "\nUser Token: " + args.connection.user_token);
        console.log(args);
      
        //window.location.href = "#/tab/polls";
        /* As this is a demo return false to cancel the redirection to the callback_uri */
        return false;
      }

    $scope.test = function() {
    	var ref = window.open('cityzen://', '_system', 'location=yes');
    }

	$scope.socialLogin = function(provider) {
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

	$scope.showLogin = function(){
		$ionicLoading.show({
			template: 'Attempting to Log In...',
		});
	};

	$scope.hideLogin = function(){
		$ionicLoading.hide();
	};


	$scope.showRegister = function(){
		$ionicLoading.show({
			template: 'Attempting to Register New User...',
		});
	};

	$scope.hideRegister = function(){
		$ionicLoading.hide();
	};
	// // Ugly OneAll code
	// /* This is an event */
 //      var my_on_login_redirect = function(args) {
 //        alert("You have logged in with " + args.provider.name + "\nUser Token: " + args.connection.user_token);
 //        console.log(args);
      
 //        window.location.href = "#/tab/polls";

 //        /* As this is a demo return false to cancel the redirection to the callback_uri */
 //        return false;
 //      }
        
 //      /* Initialise the asynchronous queue */
 //      var _oneall = _oneall || [];
        
 //       Social Login Example 
 //      _oneall.push(['social_login', 'set_providers', ['facebook', 'twitter', 'google']]);
 //      console.log('set providers');
 //      _oneall.push(['social_login', 'set_grid_sizes', [3,1]]);
 //      _oneall.push(['social_login', 'set_callback_uri', 'http://www.oneall.com/callback/']);
 //      console.log('set callback');
 //      _oneall.push(['social_login', 'set_event', 'on_login_redirect', my_on_login_redirect ]);
 //      _oneall.push(['social_login', 'do_render_ui', 'social_login_buttons']);

   	

});