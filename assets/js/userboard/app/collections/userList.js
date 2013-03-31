define(['jquery', 'underscore', 'backbone', 'firebase', 'backfire', 'app/models/userModel'], 
	function($, _, Backbone, Firebase, Backfire, UserModel) {
	
	var UserList = Backbone.Firebase.Collection.extend({
		model : UserModel,
		firebase: "https://360ds.firebaseio.com"
	});

	return UserList;
}); 