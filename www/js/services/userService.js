/*
Define all the functionality required for a user.
Logging In / Out
Changing settings
	Categories subscribed to. 
	Location settings. 

*/
app.service('userService', function($http) {
	this.userID;
	this.settings = {
		notifications: {},
		user: {}
	};

	this.authenticate = function(username, password, callback) {
		return $http.get("http://cityzenapp.us/core/auth.php?user="+ username + "&pass=" + password +"&callback=?").
  		success(function(data) {
  			data = data.substr(1);
  			console.log(data);
  			this.userID = data;
    		callback(Number(data));
  		}).
  		error(function(data) {
  			data = data.substring(1);
  			console.log('error');
  			console.log(data);
  			this.userID = data;
  			callback(Number(data));
  		});
	}

	this.logout = function() {
		$http.get("http://cityzenapp.us/core/mobile/logout.php")
		console.log('logged out!')
	}

	this.register = function(username, password, email, callback) {
		var URL = "http://www.cityzenapp.us/core/";
		var phpFile = "registerNewUser.php";
		return $http.get("http://www.cityzenapp.us/core/mobile/register.php?user=" + username + "&pass=" + password + "&email=" + email + "&callback=?").
  		success(function(data) {
  			data = data.substr(1);
  			//console.log(data);
  			//console.log(JSON.parse(data));
  			console.log(data);
    		callback(data);
  		}).
  		error(function(data) {
  			data = data.substr(1);
  			console.log('Error: Line 51, Register in UserService. This is Expected. Weird PHP Error')
  			console.log(data);
    		callback(data);
  		});

	}


	this.socialLogin = function(UUID) {
		UUID = "abcderewrwerfdrwr23e2jk3h242kjh";
		URL = "https://cityzen.api.oneall.com/socialize/connect/mobile/facebook/?nonce=" + UUID + "&callback_uri=?";
		$http.get(URL).success(function(data){
			console.log(data);
		})
	}

	this.socialLogin2 = function() {

		
	}



	function getNotificationCategories() {
		//ask server?
		return [
		{id: 1, name: "Road", selected: false}, 
		{id: 2, name: "Bike", selected: true}, 
		{id: 3, name: "Safety", selected: true}, 
		{id: 4, name: "Leisure", selected: false}
		]
	}



	this.resetDefaultSettings = function() {
		this.settings.notifications.areOn = true;
		this.settings.notifications.gpsOn = false;

		this.settings.notifications.categories = getNotificationCategories();
	
		this.settings.user.first_name = "";
		this.settings.user.last_name = "";
		this.settings.user.address = "";
	}

	this.resetDefaultSettings();

});

