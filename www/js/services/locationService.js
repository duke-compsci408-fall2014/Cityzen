/*
Define all the functionality required for polls
Viewing polls

*/
app.service('locationService', function($http) {

	//set by geolocation.watchPosition
	this.watchId = null;

	/*
	* parse location to return zip code
	*/
	this.getZipCode = function(position) {

		var coords, url;
		coords = position.coords;
		url = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + coords.latitude + "&lon=" + coords.longitude + "&addressdetails=[0|1]";
		//get street address from online service
		$http.get(url).then(function(res){
  			if (res.data.address && res.data.address.postcode){
  				localStorage.setItem("zip", res.data.address.postcode); //store current zip code
  			}
  		});
	}

	/*
	* Begin tracking GPS
	* notify when zip code changes
	* TODO: alter how geolocation notification here e.g.:
	* update by city, update by distance from coordinates
	*/
	this.watchLocation = function(geolocation){
		this.watchId = geolocation.watchPosition(function(position) {
			oldZip = localStorage.getItem("zip"); //store last seen zip code
			getZipCode(position);					
	  		if (localStorage.getItem("zip") != oldZip && oldZip != null){
	  			//notify if zip code has changed
	  			notificationService.addNotification("New zip code!", "You have entered a new location");
	  		}
		}, function(error) {
			console.log('code: '    + error.code    + '\n' +
		        'message: ' + error.message + '\n');
		}, {timeout:5000});
	}
});