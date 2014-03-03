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
	},

	// initialize: function(attributes, options){
	// 	debugger;
		
	// 	this.firebase = options.firebase.child(attributes.id);
	// }

});
/* global App:true, Backbone:true */

'use strict';

App.Collections.Users = Backbone.Firebase.Collection.extend({
	model: App.Models.User,

	initialize: function(models, options){
		this.firebase = options.firebase;
	}
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
/* global _:true, App:true, Backbone:true, JST:true, Firebase:true, FirebaseSimpleLogin:true */

'use strict';

App.Views.Index = Backbone.View.extend({
	el: $('div#app'),

	template: JST['app/templates/index.html'],

	events: {
		'click .logout': '_logout',
		'click .loginFacebook': '_loginFacebook',
		'click .loginGithub': '_loginGithub',
		'click .editProfile': '_editProfile',
		'keyup input': '_search'
	},

	initialize: function(){
		var self = this;

		this.firebase = new Firebase('https://360ds.firebaseio.com');

		this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user){
			if (error){
				console.log(error);
			}

			// user is logged in using facebook or github
			if (user){

				// we take just the basic data from the provider
				self.authUser = {
					provider: user.provider,
					name: user.name,
					providerId: user.provider + ':' + user.id
				};

				// and set a defalt profile picture
				if (user.provider === 'facebook'){
					self.authUser.profilePicture = 'https://graph.facebook.com/' + user.username + '/picture?type=large';
				} else if (user.provider === 'github'){
					self.authUser.profilePicture = user.avatar_url;
				}

				// _onFirebaseUpdate is called when the collection is loaded
				self.firebase.on('value', self._onFirebaseUpdate, self._cancelCallback, self);

				// _onFirebaseUpdate is called when any item of the collection is updated
				self.firebase.on('child_changed', self._onFirebaseUpdate, self._cancelCallback, self);

				self.collection = new App.Collections.Users([], { firebase: self.firebase });

			// user is logged out
			} else {
				delete self.authUser;
				delete self.model;
			}

			self.render();
		});
	},

	_search: function(){
		var search = (this.$('input').val() || '').toLowerCase();
		this._renderUserBoard(search);
	},

	_onFirebaseUpdate: function(){
		this.render();
	},

	render: function(){
		var self = this;

		// this sets the model if the authenticated user
		// already is in firebase.
		if (!this.model && this.authUser && this.collection){
			this.model = this.collection.find(function(model){
				return model.get('providerId') === self.authUser.providerId;
			});
		}

		this.$el.html(this.template({ user: this.authUser }));
		this._renderUserBoard();

		// and yet, these ones can be improved a little...
		if (!this.authUser){
			this.$('div#alertContent').html('<div class="alert alert-warning">You must login in order to view content.</div>');
		} else if (!this.model || !this.model.get('program')){
			this.$('div#alertContent').html('<div class="alert alert-warning">You need to be part of a program. Click on Edit Profile to join a program.</div>');
		} else {
			this.$('div#alertContent').html('');
		}
		
		return this;
	},

	_renderUserBoard: function(search){
		if (this.model && this.collection){
			this.userBoardView = this.userBoardView || new App.Views.UserBoard();
			this.userBoardView.$el = this.$('div#userBoard');
			this.userBoardView.model = this.model;
			this.userBoardView.collection = this.collection;
			this.userBoardView.render(search);
		} else {
			this.$('div#userBoard').html('');
		}
	},

	_cancelCallback: function(error){
		console.log(error);
	},

	_logout: function(){
		this.auth.logout();
	},

	_loginFacebook: function(){
		this.auth.login('facebook');
	},

	_loginGithub: function(){
		this.auth.login('github');
	},

	_editProfile: function(){
		var self = this;
		if (!this.model && this.authUser && this.collection){
			this.model = this.collection.find(function(model){
				return model.get('providerId') === self.authUser.providerId;
			});
			if (!this.model){
				this.model = this.collection.create(this.authUser);
				this.model = this.collection.find(function(model){
					return model.get('providerId') === self.authUser.providerId;
				});
			}
		}
		var editProfileView = new App.Views.EditProfile();
		this.$('div#modalContent').html(editProfileView.render().el);
		editProfileView.setModelData(this.model);
	}

});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.UserBoard = Backbone.View.extend({
	template: JST['app/templates/userBoard.html'],

	render: function(search){
		var models, self = this;

		if (search){
			models = this.collection.filter(function(model){
				return JSON.stringify(model.attributes).toLowerCase().indexOf(search) !== -1;
			});
		} else {
			models = this.collection.filter(function(model){
				return model.get('program') === self.model.get('program');
			});
		}

		this.$el.html(this.template({ models: models }));
		return this;
	}

});
/* global App:true, Backbone:true */

'use strict';

var Router = Backbone.Router.extend({
	routes: {
		'': 'index'
	},

	index: function(){
		this.indexView = this.indexView || new App.Views.Index();
	}

});

App.Router = new Router();
Backbone.history.start();
