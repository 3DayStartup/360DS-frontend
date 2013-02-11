define(['jquery', 'underscore', 'backbone', 'app/models/userModel'], function($, _, Backbone, UserModel) {


var UserView = Backbone.View.extend({
	
	id: 'user-view',
	
	
	template: _.template('<span><%= email %></span>'),


	initialize: function() {
		this.model.on('change', this.render, this);
	},

	render: function(){
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
		console.log('render:');
		console.log(this.$el);
		console.log($('#user-view').html());
	},
	
	events: {
		"click #user-view"	: "alerStatus"
	},
	
	alerStatus: function(e) {
		alert("Clicked user view!!");
	}
});

//console.dir(UserView);
//console.dir(UserModel);
var userModel = new UserModel({id: '1.json'});

userModel.set({
	'user':{
		'id'	: "1",
		'email'	:'test@test.com'
	}
});
userModel.save(null, {
		error: function(model, response) {
	  		console.log("save error response");
	    	console.log(response);
	    },
	  	success: function(model, response){
	  		console.log("save sucess response");
	  		console.log(response);
			console.log("fetch name "+userModel.get('email'));
		}
});

userModel.fetch({ 
	  	error: function(model, response) {
	  		console.log("error response");
	    	console.log(response);
	    },
	  	success: function(model, response){
	  		console.log("sucess response");
	  		console.log(response);
			console.log("fetch name "+userModel.get('email'));
	   		console.dir(userModel.toJSON());
	   		console.log("userView");
	   		var userView = new UserView({model: userModel});
	   		userView.render();
			console.log(userView.el);
			console.log("append");
			$("#user").append(userView.el);
		}
	});
 

return UserView;
});