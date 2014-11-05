app.factory('pollUpdater', function($http, $timeout) {

	var URL = "http://www.cityzenapp.us/core/poll/";
	var TIMEOUT = 5000;

	var cache = {polls: [], calls: 0};
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
	cache = {polls: [], calls: 0}; //better way that this?
	var updatePollsConstantly = function() {
		getPolls(function(response) {
			cache.polls = response;
			cache.calls++;
			console.log(cache.polls);
			$timeout(updatePollsConstantly, TIMEOUT);
		});
		
	}
	updatePollsConstantly();


	return cache


});

