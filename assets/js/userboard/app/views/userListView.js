define(['jquery', 'underscore', 'backbone', 'backbone_forms', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView) {
	console.log("userListView");	
	var UserListView = Backbone.View.extend({
		
		el : $('#content'),
		
		template : _.template($("#user-list-template").html()),

		initialize : function() {
			console.log("init userListView")
			 this.$el.html('<ul id="user-list" class="thumbnails"></ul>');
			 this.ul = $('#user-list');
			 this.collection.on('add', this.addOne, this);
		 	 this.collection.on('change', this.render, this);
		 	 this.collection.on('reset', this.render, this);
		 	 this.render();
		 },

		render : function() {
			console.log("render list")
			this.collection.forEach(this.addOne, this);
			if (this.collection.length){
				$("#page-loader").hide();
			}
			this.$el.html(this.ul);
			console.log(this.ul);
			return this;
		},
		
		addOne: function(userModel) {
			console.log(userModel.id);
			var attributes = userModel.toJSON();
			this.ul.append(this.template(attributes));
			var userView = new UserView({model : userModel});
			this.$el.append(userView.render().el);
			$("#page-loader").hide();
			return this;
		},
		events : {
			"click a.thumbnail" : "userDetails"
		},
		userDetails: function (event) {
			var id = $(event.target).closest(".thumbnail").attr("data-id");
			this.userModel = this.collection.get(id);
      		var form = new Backbone.Form({
        		model: this.userModel
    		}).render();
    		$('#myModal').append(form.el);
    		
    		form.on('blur', function(form) {
    			form.commit();
    			
    			//console.log('Title changed to "' + titleEditor.getValue() + '".');
			});
			
		
			//this.userView = new UserView({model: this.userModel});
			//this.userView.render();
			//this.userModel.fetch();
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