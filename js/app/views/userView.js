define(['jquery', 'underscore', 'backbone', 'app/models/userModel'], function($, _, Backbone, UserModel) {

	var UserView = Backbone.View.extend({

		id : 'user-view',

		template : _.template($("#item-template").html()),

		initialize : function() {
			this.model.on('change', this.render, this);
		},

		render : function() {
			console.log('render...');
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			this.input = this.$('.edit');
			console.log('[rendered]');
			return this;
		},

		events : {
			"click #item-template" : "alerStatus",
			"click .toggle" : "toggleDone",
			"dblclick .view" : "edit",
			"click a.destroy" : "clear",
			"keypress .edit" : "updateOnEnter",
			"blur .edit" : "close"
		},

		alerStatus : function() {
			console.log("modelView.event.alertStatus");
			alert("Clicked user view!!");
		},

		toggleDone : function() {
			console.log("modelView.event.toggleDone");
			//this.model.toggle();
		},

		edit : function() {
			console.log("modelView.event.edit");
			this.$el.addClass("editing");
			this.input.focus();
		},

		close : function() {
			console.log("modelView.event.close");
			var value = this.input.val();
			if (!value) {
				this.clear();
			} else {
				this.model.save({
					email : value
				});
				this.$el.removeClass("editing");
			}
		},

		updateOnEnter : function(e) {
			console.log("modelView.event.updateOnEnter");
			if (e.keyCode == 13)
				this.close();
		},

		clear : function() {
			console.log("modelView.event.clear");
			this.model.destroy();
		}
	});

	//console.dir(UserView);
	//console.dir(UserModel);
	var userModel = new UserModel({
		id : '1.json'
	});

	userModel.set({
		'user' : {
			'id' : "1",
			'email' : 'test@test.com'
		}
	});
	userModel.save(null, {
		error : function(model, response) {
			console.log("save error response");
			console.log(response);
		},
		success : function(model, response) {
			console.log("save sucess response");
			console.log(response);
			console.log("fetch name " + userModel.get('email'));
		}
	});

	userModel.fetch({
		error : function(model, response) {
			console.log("error response");
			console.log(response);
		},
		success : function(model, response) {
			console.log("sucess response");
			console.log(response);
			console.log("fetch name " + userModel.get('email'));
			console.dir(userModel.toJSON());
			console.log("userView");
			var userView = new UserView({
				model : userModel
			});
			userView.render();
			console.log(userView.el);
			console.log("append");
			$("#user").append(userView.el);
		}
	});

	return UserView;
}); 