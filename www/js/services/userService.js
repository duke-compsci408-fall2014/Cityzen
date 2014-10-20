/*
Define all the functionality required for a user.
Logging In / Out
Changing settings
	Categories subscribed to. 
	Location settings. 

*/
app.service('userService', function($http) {
	this.settings = {
		notifications: {},
		user: {}
	};

	this.login = function(userInfo) {

	}

	this.logout = function() {

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
		this.settings.notifications.areOn = false;
		this.settings.notifications.gpsOn = false;
		this.settings.notifications.pushOn = false;

		this.settings.notifications.categories = getNotificationCategories();
		this.settings.notifications.cityId = 1;

	
		this.settings.user.first_name = "Will";
		this.settings.user.last_name = "";
		this.settings.user.address = "";
	}

	this.resetDefaultSettings();

});