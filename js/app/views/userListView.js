define(['jquery', 'underscore', 'backbone', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, UserList, UserModel) {
	console.log("userListView");	
	var UserListView = Backbone.View.extend({
		
		el : '#user-list',
		tagName: 'ul',
		
		template : _.template($("#user-list-template").html()),

		initialize : function() {
		 	 console.log("init userListView");
		 	 //	this.collection.on('add', this.render, this);
		 	 this.collection.on('reset', this.render, this);
		 },

		render : function() {
			console.log('user boad view render...');
			this.$el.html("")
			this.collection.forEach(this.addOne, this);
			
			return this;
		},
		
		addOne: function(userModel) {
			console.log("userListView.addone");
			var attributes = userModel.toJSON();
			this.$el.prepend(this.template(attributes));
			console.dir($(this.$el));
			//var userView = new UserView({model : userModel});
			//this.$el.append(userView.render().el);
			return this;
		}

	});
	/*
	var userList = new UserList();
	userList.fetch({
		error: function(model, response) {
	  		console.log("UserListView error response");
	    	console.log(response);
	    },
	  	success: function(model, response){
	  		console.log("UserListView sucess response");
	  		console.log(response);
	  		var userListView = new UserListView({collection: userList});
			userListView.render();
			console.log(userListView.el);
		}
	});
	
	*/

	return UserListView;
}); 