define(['jquery', 'underscore', 'backbone', 'app/models/userModel'], function($, _, Backbone, UserModel) {
	console.log("UserList");
	var UserList = Backbone.Collection.extend({
		url : '/api-360ds.php/users.json',
		model : UserModel,
		initialize : function(models, options) {
		}
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