/*
Define all the functionality required for a user.
Logging In / Out
Changing settings
	Categories subscribed to. 
	Location settings. 

*/
app.service('userService', function($http) {
	this.userID; //user's userToken
	//persisted user data
	this.settings = {
		notifications: {}, //notification preferences, on/off, gps, categories
		user: {}, //user data, name, address
		history: [] //list of previously loaded notifications, read or unread
	};

	/*
	* returns userToken from OneAll token using tokenToId.php
	*/
	this.getUserIdFromToken = function(token) {
		var URL = "http://cityzenapp.us/core/mobile/";
		var PHP = "tokenToId.php";

		return $http.get(URL+PHP+ "?user_token="+token+"&callback=?").success(function(response){
			return response.data;
		})
	}

	/*
	* Uses connection token to collect social profile information
	*/
	this.getSocialProfile = function(connection_token, nonce) {
		var req = {
			method: 'GET',
			url: "https://cityzen.api.oneall.com/connections/"+connection_token+".json",
			headers: {
				'Authorization': 'OneAllNonce ' + nonce
			}
		}
		return $http(req).success(function(response){
			return response;
		}).error(function(){
			return "error";
		});
	}

	/*
	* authenticate username and password combination in the Cityzen database
	*/
	this.authenticate = function(username, password, callback) {
		//authenticates user with login.php
		return $http.get("http://cityzenapp.us/core/login.php?user="+ username + "&pass=" + password +"&callback=?").
  		success(function(data) {
  			this.userID = data;
    		callback(Number(data));
  		}).
  		error(function(data) {
  			data = data.substring(1);
  			console.log('non-fatal authentication error');
  			this.userID = data;
  			callback(Number(data));
  		});
	}

	/*
	* reset settings to default values
	* log user out on the browser with logout.php
	*/
	this.logout = function() {
		this.resetDefaultSettings();
		$http.get("http://cityzenapp.us/core/mobile/logout.php")
	}

	/*
	* create userToken from information provided by user in login.register using registerNewUser.php
	*/
	this.register = function(username, password, email, callback) {
		var URL = "http://www.cityzenapp.us/core/";
		var phpFile = "registerNewUser.php";
		//calls back to login.js and returns generated userToken
		return $http.get("http://www.cityzenapp.us/core/mobile/register.php?user=" + username + "&pass=" + password + "&email=" + email + "&callback=?").
  		success(function(data) {
  			data = data.substr(1);
    		callback(data);
  		}).
  		error(function(data) {
  			data = data.substr(1);
  			console.log('Non-fatal register error')
    		callback(data)
  		});

	}

	/*
	* get userToken using OneAll for Facebook
	*/
	this.socialLogin = function(UUID) {
		UUID = "abcderewrwerfdrwr23e2jk3h242kjh";
		URL = "https://cityzen.api.oneall.com/socialize/connect/mobile/facebook/?nonce=" + UUID + "&callback_uri=?";
		$http.get(URL).success(function(data){
			console.log(data);
		})
	}

	/*
	* TODO: create categories table in database and poll
	*/
	function getNotificationCategories() {
		return [
		{id: 1, name: "Road", selected: false}, 
		{id: 2, name: "Bike", selected: true}, 
		{id: 3, name: "Safety", selected: true}, 
		{id: 4, name: "Leisure", selected: false}
		]
	}

	/*
	* reset settings to default values
	*/
	this.resetDefaultSettings = function() {
		this.userID = null;

		this.settings.notifications.areOn = true;
		this.settings.notifications.gpsOn = false;
		this.settings.notifications.categories = getNotificationCategories();
	
		this.settings.user.first_name = "";
		this.settings.user.last_name = "";
		this.settings.user.address = "";

		this.settings.history = [];
	}

	this.resetDefaultSettings(); //initialize settings

});

