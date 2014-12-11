/*
Define all the functionality required for polls
Viewing polls

*/
app.service('locationService', function($http) {

	this.watchId = null;

	this.getZipCode = function(position) {

		var coords, url;
		coords = position.coords;
		url = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + coords.latitude + "&lon=" + coords.longitude + "&addressdetails=[0|1]";
		$http.get(url).then(function(res){
  			if (res.data.address && res.data.address.postcode){
  				localStorage.setItem("zip", res.data.address.postcode);
  			}
  		});
	}

	this.watchLocation = function(geolocation){

		console.log("watch location")

		this.watchId = geolocation.watchPosition(function(position) {
			oldZip = localStorage.getItem("zip");
			getZipCode(position);					
	  		if (localStorage.getItem("zip") != oldZip && oldZip != null){
	  			notificationService.addNotification("New zip code!", "You have entered a new location");
	  		}
		}, function(error) {
			console.log('code: '    + error.code    + '\n' +
		        'message: ' + error.message + '\n');
		}, {timeout:5000});
	}
});