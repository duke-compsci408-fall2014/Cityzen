/*
Define all the functionality required for polls
Viewing polls

*/
app.service('pollService', function($http, $timeout) {

	var URL = "http://www.cityzenapp.us/core/poll/";
	var TIMEOUT = 10000;

	function getPolls(callback) {
		var phpFile = "listpolls2.php";
		return $http.get(URL+phpFile+"?callback=?").
  		success(function(data) {
  			data = data.substr(1);
  			//console.log(data);
  			//console.log(JSON.parse(data));
    		callback(JSON.parse(data));
  		}).
  		error(function(data) {
    		console.log("CANNOT GET THE POLLS HALP");
  		});
	}

	this.getAllPolls = getPolls;

	/*
	* Poll database for new polls. 
	*/
	// this.cache = {polls: [], calls: 0};
	// var that = this; //better way that this?
	// var updatePollsConstantly = function() {
	// 	getPolls(function(response) {
	// 		that.cache.polls = response;

	// 		that.cache.calls++;
	// 		console.log(that.cache.calls);
	// 		$timeout(updatePollsConstantly, TIMEOUT);
	// 	});
		
	// }
	// updatePollsConstantly();

	// this.pollListEquality = function(before, after) {
	// 	return before.length == after.length;
	// }
	/*
	*Above logic should be abstracted somehow because is reused. 
	*/


	this.getPollsByCity = function(cityName) {
		//get polls by city
	}

	this.getPollsByUserId = function(userId) {
		//get all polls for a specific user
	}

	


});