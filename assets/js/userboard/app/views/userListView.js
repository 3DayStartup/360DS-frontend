define(['jquery', 'underscore', 'backbone', 'backbone_forms', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView) {	
	var UserListView = Backbone.View.extend({
		
		el : $('#content'),
		
		template : _.template('<li data-id="<%= id %>" class="user-block <%= participant_role %>">\
				<div class="user-block-reflection"></div>\
				<img src="<%= profile_picture %>&s=144" alt="">\
				<h5><%= name %></h5>\
				<h6><%= participant_role %></h6>\
			</li>'),

		initialize : function() {
			 this.$el.html('<h3>This section is restricted to members.</h3><ul id="user-list" class="thumbnails"></ul>');
			 this.$ul = this.$('#user-list');
			 this.collection.on('add', this.addOne, this);
		 	 this.collection.on('change', this.render, this);
		 	 this.collection.on('reset', this.render, this);
		 	 this.render();
		 },

		render : function() {
			this.$el.html("<h3>This section is restricted to members.</h3>");
			this.$ul.html("");
			$("#page-loader").show();			
			this.collection.forEach(this.addOne, this);
			if (this.collection.length){
				$("#page-loader").hide();
			}
			this.$el.append(this.$ul);
			return this;
		},

		events: {
			"click .user-block": "userModal",
		},
		
		addOne: function(userModel) {

			var attributes = userModel.toJSON();
			this.$ul.append(this.template(attributes));
			var userView = new UserView({model : userModel});
			this.$el.append(userView.render().el);
			$("#page-loader").hide();
			return this;
		},

		userModal: function(event){
			var $userCard = $(event.currentTarget)
			var $modal = $('<div>');

			var userId = $userCard.data("id");
			var user = this.collection.get(userId);

			var form = new Backbone.Form({
        		model: user
    		}).render();

    		$modal.addClass('modal');
    		$modal.html('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    		$modal.append('<img src="'+user.get("profile_picture")+'" />');
    		$modal.append(form.el);
    		
    		$modal.find("input").attr("readonly", "readonly");
    		$modal.find("select").attr("disabled", "true");
    		$modal.modal();			
		},

	});

	return UserListView;
}); 