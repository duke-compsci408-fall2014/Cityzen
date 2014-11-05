/*
Define all the functionality required for a user.
Logging In / Out
Changing settings
	Categories subscribed to. 
	Location settings. 

*/
app.service('userService', function($http) {
	var FRANCESCO_ID = 201;
	var currUsers = [
		{user: 'Connor', pass: 'connor'},
		{user: 'Hailey', pass: 'hailey'},
		{user: 'Francesco', pass: 'francesco'}
	];

	this.settings = {
		notifications: {},
		user: {}
	};

	this.login = function(username, password) {
		console.log('begin func');
		for (i = 0; i < currUsers.length; i++){
			console.log(i);
			if(currUsers[i].user == username && currUsers[i].pass == password){
				console.log('yes');
				return true;
			}
		}
		return false;
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
		//ask server?
		return ["Raleigh", "Durham", "New York", "Boston"]
	}

	this.resetDefaultSettings = function() {
		//do we need this? ask server about
		// settings or just have default?
		this.settings.notifications.areOn = true;
		this.settings.notifications.gpsOn = false;
		this.settings.notifications.pushOn = true;

		this.settings.notifications.categories = getNotificationCategories();
		this.settings.notifications.cityId = 1;

	
		this.settings.user.first_name = "";
		this.settings.user.last_name = "";
		this.settings.user.address = "";
	}

	this.resetDefaultSettings();

});