/*
Define all the functionality required for polls
Viewing poll
*/
app.service('pollService', function($http, $timeout) {

	var URL = "http://www.cityzenapp.us/core/poll/";
	var TIMEOUT = 10000;

	//get list of polls from the database
	this.getAllPolls = function getPolls(callback) {
		var phpFile = "listpolls2.php";
		//calls back to polls.js
		return $http.get(URL+phpFile+"?callback=?").
  		success(function(data) {
  			data = data.substr(1);
    		callback(JSON.parse(data));
  		}).
  		error(function(data) {
    		console.log("Unable to load polls");
  		});
	}

	/*
	* Add specific get polls here, e.g:
	* getPollByCategory
	* getPollByLocation
	*/
});