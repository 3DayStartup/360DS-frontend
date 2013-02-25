// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:

  // Todo Model
  // ----------
define([
	"jquery", "underscore", "backbone", 
	"app/models/userModel", "app/collections/userList", "app/views/userView", "app/views/userListView"
], function($, _, Backbone, 
	UserModel, UserList, UserView, UserListView) {
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			"user/:id" : "showUser",
			"(/)user-board.html#user/:id" : "showUser",
			//default
			"*path" : "index"
		},
		
		initialize: function(){
			console.log("$$$$$$ router init");
			//this.userList = new UserList({model: UserModel});
			//this.userListView = new UserListView({collection: this.userList});
			// this.userList.fetch({
				// error: function(model, response) {
			  		// console.log("error response");
			    	// console.log(response);
			    // },
			  	// success: function(model, response){
			  		// console.log("sucess response");
			  		// console.log(response);
					// // console.log("fetch name "+user.get('email'));
			   		// // console.dir(user.toJSON());
				// }
			// });			
			
		},
		start: function() {
			Backbone.history.start({pushState: true});
		},
		index: function() {
			this.userModel = new UserModel({id: "1.json"});
			this.userView = new UserView({model: this.userModel});
			this.userModel.fetch();
			
		},
		showUser: function(id) {
			console.log("------ showuder: "+id);	
		}
	});
	
	return AppRouter;
});

