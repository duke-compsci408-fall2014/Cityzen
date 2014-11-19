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

	var my_on_login_redirect = function(args) {
        alert("You have logged in with " + args.provider.name + "\nUser Token: " + args.connection.user_token);
        console.log(args);
      
        //window.location.href = "#/tab/polls";
        /* As this is a demo return false to cancel the redirection to the callback_uri */
        return false;
      }

	$scope.socialLogin = function(provider) {
		// _oneall.push(['social_login', 'set_event', 'on_login_redirect', my_on_login_redirect ]);
		// console.log(_oneall);
		// _oneall.push(['social_login', 'do_login', 'facebook']);
		var UUID = "abcderewrwerfdrwr23e2jk3h242kjh";
		var URL = "https://cityzen.api.oneall.com/socialize/connect/mobile/facebook/?nonce=" + UUID + "&callback_uri=http://localhost:8100/#/";
		var ref = window.open(URL, '_system', 'location=yes');

		ref.addEventListener( "loadstop", function() {
			ref.executeScript(
        		{ code: "window.close();" },
        		function(values) {
        			console.log(values);
            		alert(values[0]);
        		}
    		);
		});

		return false;
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