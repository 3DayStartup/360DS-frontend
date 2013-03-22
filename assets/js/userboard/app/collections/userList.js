define(['jquery', 'underscore', 'backbone', 'firebase', 'backfire', 'app/models/userModel'], 
	function($, _, Backbone, Firebase, Backfire, UserModel) {
	
	console.log("UserList");
	var UserList = Backbone.Firebase.Collection.extend({
		model : UserModel,
		firebase: "https://360ds.firebaseio.com"
	});
	/*
	var userList = new UserList();
	
	userList.fetch({
		error: function(model, response) {
	  		console.log("error response");
	    	console.log(response);
	    },
	  	success: function(model, response){
	  		console.log("sucess response");
	  		console.log(response);
			// console.log("fetch name "+user.get('email'));
	   		// console.dir(user.toJSON());
		}
	});
	*/
	return UserList;
}); 