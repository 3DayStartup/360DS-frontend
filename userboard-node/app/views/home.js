/* global App:true, Backbone:true, JST:true, Firebase:true, FirebaseSimpleLogin:true */

'use strict';

App.Views.Home = Backbone.View.extend({
	el: $('div#app'),

	template: JST['app/templates/home.html'],

	events: {
		'click .editProfile': '_editProfile'
	},

	initialize: function(){
		this.firebase = new Firebase(App.FirebaseUrl);
		var self = this;

		// Authenticates app and user
		// callback is called when login gets in/out or fails.
		this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user){
			if (error){
				console.log(error);
			}
			if (user){
				user.providerId = user.provider + ':' + user.id;
				// delete social id so firebase can set its own id
				delete user.id;
			}

			// Create model from user data
			self.model = user ? new App.Models.User(user) : user;
			self.render();
		});

		// Gets the users
		// callback is called when ever the collection is loaded, and then
		// whenever the collection is updated.
		this.collection = new App.Collections.Users();
		this.collection.firebase.on('value', function(){

			// See if current user is already in firebase
			var existingModel = self.collection.find(function(u){
				return u.get('providerId') === self.model.get('providerId');
			});

			if (existingModel){
				self.model = existingModel;
			} else {

				// If not in firebase, add it
				self.collection.add(self.model);
			}

			self.render();
		});
	},

	logout: function(){
		this.auth.logout();
	},

	login: function(provider){
		this.auth.login(provider);
	},

	_editProfile: function(){
		var editProfile = new App.Views.EditProfile();
		this.$('div#modalContent').html(editProfile.render().el);
		editProfile.setModelData(this.model);
	},

	render: function(){
		this.$el.html(this.template());
		this._renderHeader();
		// this._renderContent();
		return this;
	},

	_renderHeader: function(){
		this.headerView = this.headerView || new App.Views.Header();
		this.headerView.$el = this.$('div#header');
		this.headerView.model = this.model;
		this.headerView.render();
	}

	// _renderContent: function(){
	// 	this.contentView = this.contentView || new App.Views.Content();
	// 	this.contentView.$el = this.$('div#content');
	// 	this.contentView.collection = this.collection;
	// 	this.contentView.render();
	// }
});