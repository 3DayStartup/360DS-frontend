define(['jquery', 'underscore', 'backbone', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, UserList, UserModel, UserView) {
	console.log("userListView");	
	var UserListView = Backbone.View.extend({
		
		el : '#user-list',
		tagName: 'ul',
		
		template : _.template($("#user-list-template").html()),

		initialize : function() {
		 	 //	this.collection.on('add', this.render, this);
		 	 this.collection.on('reset', this.render, this);
		 },

		render : function() {
			this.$el.html("")
			this.collection.forEach(this.addOne, this);
			
			return this;
		},
		
		addOne: function(userModel) {
			var attributes = userModel.toJSON();
			this.$el.append(this.template(attributes));
			//var userView = new UserView({model : userModel});
			//this.$el.append(userView.render().el);
			return this;
		},
		events : {
			"click a.thumbnail" : "userDetails"
		},
		userDetails: function (event) {
			var id = $(event.target).closest(".thumbnail").attr("data-id");
			console.log("user-id: "+id);
			
      		this.userModel = new UserModel({'id': id+".json"});
			this.userView = new UserView({model: this.userModel});
			this.userModel.fetch();
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