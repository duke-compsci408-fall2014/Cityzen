/*
* Service for oneAll
*/ 

app.service('locationService', function($http) {

	this.getZipCode = function(position) {



		var coords, url;
		coords = position.coords;
		url = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + coords.latitude + "&lon=" + coords.longitude + "&addressdetails=[0|1]";
		$http.get(url).then(function(res){
  			
  		});
	}
});