/*
Define all the functionality required for polls
Viewing polls

*/
app.service('pollService', function($http) {

	this.getAllPolls = function() {
		//get all polls with HTTP request...


		poll1 = {
			id: 1,
			name: "Should LA citizens be paid to vote in city elections?",
			description: "Some believe the incentives could help turnout, others say this would send the wrong message.",
			customerid: 1,
			trackbacK: "http://southerngatewaystudy.com",
			socialpost: null
		};
		poll2 = {
			id: 2,
			name: "Gateway Improvement",
			description: "Raleigh seeks to improve the city's Southern Gateway along South Saunders Street.  Which one of these could help most?",
			customerid: 1,
			trackbacK: "http://southerngatewaystudy.com",
			socialpost: "727876970594007"
		};
		poll3 = {
			id: 3,
			name: "South Saunders Improvement",
			description: "Should the city improve the bicycle & pedestrian experience along South Saunders Street, even if it meant traffic delays?",
			customerid: 1,
			trackbacK: "http://southerngatewaystudy.com",
			socialpost: "727892827259088"
		};
		return [poll1, poll2, poll3]
	}

	this.getPollsByCity = function(cityName) {
		//get polls by city
	}

	this.getPollsByUserId = function(userId) {
		//get all polls for a specific user
	}
	


});