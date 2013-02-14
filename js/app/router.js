// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:

  // Todo Model
  // ----------
define([
	"jquery", "underscore", "backbone", 
	"app/models/userModel", "app/collections/userList", "app/views/userView", "app/views/userBoardView"
], function($, _, Backbone, 
	UserModel, UserList, UserView, UserBoardView) {
	
	var userModel = new UserModel({id: "1.json"});
	
	var Router = new (Backbone.Router.extend({
		routes: {
			"user/:id" : "showUser",
			//default
			"*path" : "index"
		},
		
		initialize: function(){
			console.log("$$$$$$ router init");
			this.userModel = new UserModel({id: "1.json"});
			this.userView = new UserView({model: this.userModel});
			
		},
		start: function() {
			Backbone.history.start({pushState: true});
		},
		index: function() {
			console.log("!!!! index")
			
			$("#user").append(this.userView.el);
			this.userModel.fetch();
			
			
		},
		showUser: function(id) {
			console.log("showuder: "+id);	
		}
	}));
	
	return Router;
});

