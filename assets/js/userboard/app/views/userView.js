define(['jquery', 'underscore', 'backbone', 'app/models/userModel', 'md5'], 
function($, _, Backbone, UserModel, md5) {

	var UserView = Backbone.View.extend({

		el : $('.userView'),

		template : _.template('<div class="modal-header">\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
				<h3 id="myModalLabel"><%- name %></h3>\
			</div>\
			<div class="modal-body">\
				<div class="view"><a class="toggle"><%- email %></a>\
			</div>\
				Name: <input placeholder="Name" class="edit" type="text" data-key="name" value="<%- name %>" /><br/>\
				Email: <input placeholder="Email" class="edit" type="text" data-key="email" value="<%- email %>" /><br/>\
				Profile Picture: <input placeholder="Profile Picture" class="edit" type="text" data-key="profile_picture" value="<%- profile_picture %>" />\
			</div>\
			<div class="modal-footer">\
				<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>\
				<button class="btn btn-primary">Save changes</button>\
			</div>'),

		  initialize : function() {
		 	this.model.on('change', this.render, this);
			this.render();
		  }, 

		render : function(model) {
			this.$el.html("");
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			this.input = this.$('.edit');
			this.body = this.$('.modal-body');
			return this;
		},
		events : {
			"keypress .edit" : "updateOnEnter"
		},
		edit : function() {
			this.body.addClass("editing");
			this.input.focus();
		},
		close : function() {
			
		},
		updateOnEnter : function(e) {
			console.log("modelView.event.updateOnEnter");
			if (e.keyCode == 13) this.close();
		},
		editModal: function(){
			this.$el.modal();
			this.$('.modal-body').addClass("editing");
		}
	});
	return UserView;
}); 