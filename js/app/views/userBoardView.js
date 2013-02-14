define(['jquery', 'underscore', 'backbone', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], function($, _, Backbone, UserList, UserModel, UserView) {
	console.log("userBoardView");
	var UserBoardView = Backbone.View.extend({
		
		//id : 'user-view',
		
		template : _.template($("#user-template").html()),

		// initialize : function() {
			// this.model.on('change', this.render, this);
		// },

		render : function() {
			console.log('user boad view render...');
			//var attributes = this.model.toJSON();
			//this.$el.html(this.template(attributes));
			//this.input = this.$('.edit');
			//console.log('[rendered]');
			this.collection.forEach(this.addOne, this);
			return this;
		},
		
		addOne: function(userModel) {
			console.log("userboardview.addone");
			var userView = new UserView({model : userModel});
			this.$el.append(userView.render().el);
			return this;
		}

	});
	/*
	var userList = new UserList();
	userList.fetch({
		error: function(model, response) {
	  		console.log("UserBoardView error response");
	    	console.log(response);
	    },
	  	success: function(model, response){
	  		console.log("UserBoardView sucess response");
	  		console.log(response);
	  		var userBoardView = new UserBoardView({collection: userList});
			userBoardView.render();
			console.log(userBoardView.el);
		}
	});
	
	*/

	return UserBoardView;
}); 