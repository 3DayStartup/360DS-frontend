define(['jquery', 'underscore', 'backbone', 'backbone_forms', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView) {	
	var UserListView = Backbone.View.extend({
		
		el : $('#content'),
		
		template : _.template('<li data-id="<%= id %>" class="user-block <%= participantRole %>">\
				<div class="user-block-profile-picture" style="background-image:url(<%= profilePicture %>&s=204);" alt="<%= name %> profiles picture"></div>\
				<h5><%= name %></h5>\
				<h6><%= participantRole %></h6>\
			</li>'),
			
		template_userView : _.template('\
				<div class="modal-header">\
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
					<h3 id="myModalLabel"><%- name %></h3>\
				</div>\
				<div class="modal-body">\
					<img class="thumbnail modal-profile-picture" src="<%= profilePicture %>&s=180" />\
					<dl class="dl-horizontal">\
	  					<dt>Role </dt><dd><%= participantRole %></dd>\
	  					<dt>Email </dt><dd><a href="mailto:<%= email %>"><%= email %></a></dd>\
	  					<dt>Company </dt><dd><%= company ? company : "&nbsp;" %></dd>\
	  					<dt>Team at 3DS weekend </dt><dd><%= team ? team : "&nbsp;" %></dd>\
	  					<dt>Studied </dt><dd><%= fieldOfStudy ? fieldOfStudy : "&nbsp;" %></dd>\
	  					<dt>Degree </dt><dd><%= degreeProgram ? degreeProgram : "&nbsp;" %></dd>\
	  					<dt>School </dt><dd><%= university ? university : "&nbsp;" %></dd>\
	  					<dt>Site </dt><dd><%= website ? website : "&nbsp;" %></dd>\
					</dl>\
					<a class="btn" href="<%= twitterUrl %>"><i class="icon-twitter"></i> Twitter</a> \
					<a class="btn" href="<%= linkedinUrl %>"><i class="icon-linkedin"></i> LinkedIn</a>\
				</div>\
				'),

		initialize : function() {
			$('#user-details').addClass('fade');
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
			var $modal = $('#user-details');

			var userId = $userCard.data("id");
			var user = this.collection.get(userId);

			// var form = new Backbone.Form({
        		// model: user
    		// }).render();
			
			console.log(user.toJSON());
			
    		$modal.addClass('modal');
    		$modal.html('');
    		//$modal.append('<img src="'+user.get("profilePicture")+'&s=204" />');
    		$modal.append(this.template_userView(user.toJSON()));
    		//$modal.append(form.el);
    		
    		//$modal.find("input").attr("readonly", "readonly");
    		//$modal.find("select").attr("disabled", "true");
    		$modal.modal();			
		},

	});

	return UserListView;
}); 