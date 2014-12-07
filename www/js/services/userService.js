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

	this.register = function(username, password, email, callback) {
		var newUserId = 0;
		return $http.get("http://cityzenapp.us/core/registerNewUser.php?user="+ username + "&pass=" + password +"&email=" + email + "&callback=?").
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

	function getAvailableCities() {
		//TODO: get from DB
		return ["Raleigh", "Durham", "New York", "Boston"]
	}

	this.resetDefaultSettings = function() {
		//do we need this? ask server about
		// settings or just have default?
		this.settings.notifications.areOn = true;
		this.settings.notifications.gpsOn = false;

		this.settings.notifications.categories = getNotificationCategories();
		this.settings.notifications.cityId = 0;

	
		this.settings.user.first_name = "";
		this.settings.user.last_name = "";
		this.settings.user.address = "";
	}

	this.resetDefaultSettings();


});

