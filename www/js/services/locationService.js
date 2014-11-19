/*
Define all the functionality required for polls
Viewing polls

*/
app.service('locationService', function($http) {

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
});