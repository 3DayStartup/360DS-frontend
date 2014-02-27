/* global App:true, Backbone:true */

'use strict';

App.Models.User = Backbone.Model.extend({

	schema: {
		participantRole: {
			type: 'Select',
			options: [
				'Participant',
				'Organizer',
				'Mentor'
			]
		},
		name: 'Text',
		email: {
			validators: [
				'required',
				'email'
			]
		},
		profilePicture: { validators: ['url'] },
		company: 'Text',
		program: {
			type: 'Select',
			options: [
				'',
				'3DS RetailMeNot Spring 2013',
				'3DS University of Houston Spring 2013',
				'3DS TAMU Spring 2013',
				'3DS St Marys Summer 2013',
				'3DS Bogota Summer 2013',
				'3DS Austin Fall 2013',
				'3DS San Antonio Summer 2013',
				'3DS Georgia Tech Fall 2013'
			],
			validators: ['required']
		},
		fieldOfStudy: 'Text',
		degreeProgram: {
			type: 'Select',
			options: [
				'High School',
				'Associate',
				'Bachelor',
				'Master',
				'Doctorate',
				'Juris Doctorate'
			]
		},
		university: 'Text',
		website: { validators: ['url'] },
		linkedinUrl: { validators: ['url'] },
		twitterUrl: { validators: ['url'] }
	}

});
/* global App:true, Backbone:true */

App.Collections.Users = Backbone.Firebase.Collection.extend({
	model: App.Models.User,
	firebase: App.FirebaseUrl
});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.EditProfile = Backbone.Modal.extend({
	template: JST['app/templates/editProfile.html'],
	
	cancelEl: '.bbm-button',

	events: {
		'click .save': '_save'
	},

	setModelData: function(model){
		this.model = model;
		this.$('h3').html(this.model.get('name'));
		this.form = new Backbone.Form({
		    model: this.model
		}).render();
		this.$('.profile').append(this.form.el);
	},

	_save: function(){
		var data = this.form.getValue();
		this.model.set(data);
	}
});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.Header = Backbone.View.extend({
	template: JST['app/templates/header.html'],

	render: function() {
		this.$el.html(this.template({ model: this.model }));
		return this;
	}
});
/* global App:true, Backbone:true, JST:true, Firebase:true, FirebaseSimpleLogin:true */

'use strict';

App.Views.Home = Backbone.View.extend({
	el: $('div#app'),

	template: JST['app/templates/home.html'],

	events: {
		'click .editProfile': '_editProfile',
		'keyup input': '_search'
	},

	_search: function(){
		var searchText = (this.$('input').val() || '').toLowerCase();

		if (this.collection){
			var filteredModels = this.collection.filter(function(model){
				var s = JSON.stringify(model.attributes).toLowerCase();
				return s.indexOf(searchText) !== -1;
			});
			this._renderUserBoard(filteredModels);
		}
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

			self.model = (user ? new App.Models.User(user) : user);
			if (self.model){
				self._syncWithCollection(self);
			}
			self.render();
		});

		// Gets the users
		// callback is called when ever the collection is loaded, and then
		// whenever the collection is updated.
		this.collection = new App.Collections.Users();
		this.collection.firebase.on('value', function(){
			self._syncWithCollection(self);
			self.render();
		});
	},

	_syncWithCollection: function(self){

		// See if current user is already in firebase
		var existingModel = self.collection.find(function(u){
			return u.get('providerId') === self.model.get('providerId');
		});

		if (existingModel){
			self.model = existingModel;
		} else {

			// If not in firebase, add it. Set profile picture first
			if (self.model.get('provider') === 'facebook'){
				self.model.set('profilePicture', 'https://graph.facebook.com/' + self.model.get('username') + '/picture?type=large');
			} else if (self.model.get('provider') === 'github'){
				self.model.set('profilePicture', self.model.get('avatar_url'));
			}
			self.collection.add(self.model);
		}
	},

	logout: function(){
		this.auth.logout();
	},

	login: function(provider){
		this.auth.login(provider);
	},

	_editProfile: function(){
		var editProfileView = new App.Views.EditProfile();
		this.$('div#modalContent').html(editProfileView.render().el);
		editProfileView.setModelData(this.model);
	},

	render: function(){
		this.$el.html(this.template());
		this._renderHeader();

		// Filter by current user's program
		if (this.collection && this.model){
			var self = this;
			this._renderUserBoard(this.collection.filter(function(model){
				return model.get('program') === self.model.get('program');
			}));
		} else {
			this._renderUserBoard();
		}

		return this;
	},

	_renderHeader: function(){
		this.headerView = this.headerView || new App.Views.Header();
		this.headerView.$el = this.$('div#header');
		this.headerView.model = this.model;
		this.headerView.render();
	},

	_renderUserBoard: function(models){
		this.userBoardView = this.userBoardView || new App.Views.UserBoard();
		this.userBoardView.$el = this.$('div#userBoard');
		this.userBoardView.model = this.model;
		this.userBoardView.models = models;
		this.userBoardView.render();
	}
});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.UserBoard = Backbone.View.extend({
	template: JST['app/templates/userBoard.html'],

	render: function() {
		this.$el.html(this.template({
			model: this.model,
			models: this.models
		}));
		return this;
	}
});
/* global App:true, Backbone:true */

'use strict';

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'logout': 'logout',
		'loginFacebook': 'loginFacebook',
		'loginGithub': 'loginGithub'
	},

	home: function(){
		this.homeView = this.homeView || new App.Views.Home();
	},

	logout: function(){
		this.home();
		this.homeView.logout();
	},

	loginFacebook: function(){
		this.home();
		this.homeView.login('facebook');
	},

	loginGithub: function(){
		this.home();
		this.homeView.login('github');
	}

});

App.Router = new Router();
Backbone.history.start();