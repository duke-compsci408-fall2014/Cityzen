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





	$scope.register = function(){
		console.log("begin register");
		var registerSuccess = $ionicPopup.alert({
     			title: 'Registration Successful'
   			});
   		
   			registerSuccess.then(function(res) {
       			window.location.href = "#/tab/polls";
   			});
	}



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