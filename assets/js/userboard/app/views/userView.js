define(['jquery', 'underscore', 'backbone', 'app/models/userModel', 'md5'], 
function($, _, Backbone, UserModel, md5) {

	var UserView = Backbone.View.extend({

		el : $('.userView'),

		template : _.template(''),

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
			if (e.keyCode == 13) this.close();
		},
		editModal: function(){
			console.log("editing");
			this.$el.modal();
			this.$('.modal-body').addClass("editing");
		}
	});
	return UserView;
}); 