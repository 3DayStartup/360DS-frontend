// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:

  // Todo Model
  // ----------
define([
	"jquery", "underscore", "backbone", "firebaseAuthClient",
	"app/models/userModel", 
	"app/collections/userList", 
	"app/views/userView", "app/views/userListView", "app/views/userAuth"
], function($, _, Backbone, FirebaseAuthClient,
	UserModel, 
	UserList, 
	UserView, UserListView, UserAuth) {


// Belongs in a View.
	currentUser = undefined;		
	
	var Router = Backbone.Router.extend({
		routes: {
			"user/:id" : "showUser",
			"(/)user-board.html#user/:id" : "showUser",
			//default
			"": "index",
			"home-2/": "index",
			"(/)user-board(/)" : "index"
		},
		index: function(){
			userListView = this.userListView = new UserListView({collection: this.userList});
		},
		initialize: function(){
			currentUser = this.currentUser = undefined;
			userList = this.userList = new UserList();
			userAuth = this.userAuth = new UserAuth();
		},
		start: function() {
			Backbone.history.start({pushState: true});
		},
		showUser: function(id) {
		}
	});
	
	return Router;
});

