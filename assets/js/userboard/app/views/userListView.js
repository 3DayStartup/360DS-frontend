define(['jquery', 'underscore', 'backbone', 'backbone_forms', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView) {
	console.log("userListView");	
	var UserListView = Backbone.View.extend({
		
		el : $('#content'),
		
		template : _.template('<a class="thumbnail" data-id="<%= id %>" data-toggle="modal" data-target="#myModal"><li>\
				<img src="<%= profile_picture %>" alt="">\
				<h4><%= name %></h4>\
				<h5><%= participant_role %></h5>\
				<h5><%= email %></h5>\
			</li></a>'),

		initialize : function() {
			 this.$el.html('<ul id="user-list" class="thumbnails"></ul>');
			 this.$ul = this.$('#user-list');
			 this.collection.on('add', this.addOne, this);
		 	 this.collection.on('change', this.render, this);
		 	 this.collection.on('reset', this.render, this);
		 	 this.render();
		 },

		render : function() {
			this.$el.html("");
			this.$ul.html("");
			$("#page-loader").show();			
			this.collection.forEach(this.addOne, this);
			if (this.collection.length){
				$("#page-loader").hide();
			}
			this.$el.html(this.$ul);
			return this;
		},
		
		addOne: function(userModel) {

			var attributes = userModel.toJSON();
			this.$ul.append(this.template(attributes));
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
		}

	});

	return UserListView;
}); 