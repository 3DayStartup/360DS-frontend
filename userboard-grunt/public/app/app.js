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

		// _onFirebaseUpdate is called when the collection is loaded
		this.firebase.on('value', this._onFirebaseUpdate, this._cancelCallback, this);

		// _onFirebaseUpdate is called when any item of the collection is updated
		this.firebase.on('child_changed', this._onFirebaseUpdate, this._cancelCallback, this);

		this.collection = new App.Collections.Users([], { firebase: this.firebase });

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

			// user is logged out
			} else {
				delete self.authUser;
			}

			self.render();
		});
	},

	_search: function(){
		var search = (this.$('input').val() || '').toLowerCase();
		this.render(search);
	},

	_onFirebaseUpdate: function(){
		this.render();
	},

	render: function(search){
		var self = this;

		// this sets the model, if the authenticated user
		// already is in firebase.
		if (!this.model && this.authUser && this.collection){
			this.model = this.collection.find(function(model){
				return model.get('providerId') === self.authUser.providerId;
			});
		}

		// if search defined then show the matching models
		var models = null;
		if (this.collection){
			if (search){
				models = this.collection.filter(function(model){
					var s = JSON.stringify(model.attributes).toLowerCase();
					return s.indexOf(search) !== -1;
				});
			// if no search defined, show the users in the same program
			} else if (this.model) {
				models = this.collection.filter(function(model){
					return model.get('program') === self.model.get('program');
				});
			}
		}

		this.$el.html(this.template({
			user: this.authUser,
			model: this.model,
			models: models
		}));

		return this;
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

App.Views.UserBoard = Backbone.Views.extend({
	el: $('div#userBoard'),

	template: JST['app/templates/userBoard.html'],

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
