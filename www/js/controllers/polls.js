'use strict';

app.controller('PollsCtrl', ['$scope', 'pollService', '$ionicLoading','$timeout', function($scope, pollService, $ionicLoading, $timeout) {

	$scope.polls = null;
	
	/*
	* load all polls found on database
	*/
	pollService.getAllPolls(function(response){
		$scope.polls = response; //save polls to scope
		$ionicLoading.hide(); //hide load screen once polls have loaded
	})

	/*
	* open poll in inAppBrowser when clicked
	* calls auth.php to authenticate user and log them in on the browser
	* redirects to poll URL given by "URL"
	*/
	$scope.openPollURL = function(URL) {

		var authURL = "http://cityzenapp.us/core/mobile/";
		var phpFile = "auth.php";
		var userID = localStorage.getItem('userID');
		//open browser and run auth.php with userID
		var newWindow = window.open(authURL + phpFile + '?userID=' + userID, '_blank', 'location=yes');
		var loaded = false; //prevents page from reloading multiple times
		newWindow.addEventListener('loadstop', function(){
			console.log('loadstop');
			if(!loaded){
				newWindow.executeScript({
					code: "window.location.href = '" + URL +"'" //redirect to poll URL
				});
				loaded = true;
			}
		})
		return false;
	}
 
 	/*
 	*  Ionic feature: show load message
 	*/
	$scope.show = function(){
		$ionicLoading.show({
			template: 'Loading...',
		});
	};

 	/*
 	*  Ionic feature: hide load message
 	*/
	$scope.hide = function(){
		$ionicLoading.hide();
	};

	$scope.searchText = ""; //initialize search bar with empty text
	$scope.show(); //display ionic load screen

}]);