define(['jquery', 'underscore', 'backbone', 'app/models/userModel', 'md5'], 
function($, _, Backbone, UserModel, md5) {

	var UserView = Backbone.View.extend({

		el : $('#myModal'),
		

		template : _.template('<div class="modal-header">\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
				<h3 id="myModalLabel">Modal header <%- name %></h3>\
			</div>\
			<div class="modal-body">\
				<div class="view"><a class="toggle"><%- email %></a>\
			</div>\
				<input class="edit" type="text" data-key="email" value="<%- email %>" />\
			</div>\
			<div class="modal-footer">\
				<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>\
				<button class="btn btn-primary">Save changes</button>\
			</div>'),

		  initialize : function() {
		 	this.setGravatarImage();
		 	this.model.on('change', this.render, this);
			this.render();
		  }, 

		render : function(model) {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			this.input = this.$('.edit');
			this.body = this.$('.modal-body');
			return this;
		},
		setGravatarImage: function(){
			if(this.model.get("gravatar_email") && this.model.get("gravatar_email") !== "") {
				var md5Hash = md5(this.model.get("gravatar_email"));
				this.model.set("profile_picture", "http://www.gravatar.com/avatar/"+md5Hash)
			}
		},
		events : {
			"click .view" : "edit",
			"keypress .edit" : "updateOnEnter",
			"blur .edit" : "close"
		},
		edit : function() {
			this.body.addClass("editing");
			this.input.focus();
		},
		close : function() {
			var value = this.input.val();
			if (!value) {
				console.log("clear");
				this.clear();
			} else {
				console.log(this.body);
				this.model.set({
					email : value
				});
				this.body.removeClass("editing");
			}
		},
		updateOnEnter : function(e) {
			console.log("modelView.event.updateOnEnter");
			if (e.keyCode == 13) this.close();
		}
	});
/*
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
			// console.log("save error response");
			// console.log(response);
		},
		success : function(model, response) {
			// console.log("save sucess response");
			// console.log(response);
			// console.log("fetch name " + userModel.get('email'));
		}
	});

	userModel.fetch({
		error : function(model, response) {
			// console.log("error response");
			// console.log(response);
		},
		success : function(model, response) {
			// console.log("sucess response");
			// console.log(response);
			// console.log("fetch name " + userModel.get('email'));
			// console.dir(userModel.toJSON());
			// console.log("userView");
			var userView = new UserView({
				model : userModel
			});
			userView.render();
			// console.log(userView.el);
			// console.log("append");
			$("#user").append(userView.el);
		}
	});
	*/
	return UserView;
}); 