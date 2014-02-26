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

// App.Collections.Users = Backbone.Collection.extend({
// 	model: App.Models.User,
// 	firebase: new Backbone.Firebase(App.FirebaseUrl)
// });

App.Collections.Users = Backbone.Firebase.Collection.extend({
	model: App.Models.User,
	firebase: App.FirebaseUrl
});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.Header = Backbone.View.extend({
	el: $('div#header'),

	template: JST['app/templates/header.html'],

	render: function() {
		this.$el.html(this.template({ user: this.user }));
		return this;
	}
});
/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.Profile = Backbone.View.extend({
	el: $('body'),

	template: JST['app/templates/profile.html'],

	render: function() {
		debugger;
		this.$el.html(this.template({ model: this.model }));
		var form = new Backbone.Form({
			model: this.model
		}).render();
		this.$('.modal-body').append(form.el);
		return this;
	}
});
/* global App:true, Backbone:true, Firebase:true, FirebaseSimpleLogin:true */

'use strict';

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'loginfacebook': 'loginFacebook',
		'logintwitter': 'loginTwitter',
		'logingithub': 'loginGithub',
		'logout': 'logout',
		'editprofile': 'editProfile'
	},

	initialize: function(){
		var firebase = new Firebase(App.FirebaseUrl);
		App.Auth = new FirebaseSimpleLogin(firebase, function(error, user){
			if (error){
				console.log(error);
			}
			if (user){
				user.providerId = user.provider + ':' + user.id;
				delete user.id;
			}
			App.CurrentUser = user;
			App.Router.home();
		});

		App.Users = new App.Collections.Users();
		App.Users.firebase.on('value', this._firebaseUpdated);
	},

	home: function(){
		this._renderHeader();
	},

	loginFacebook: function(){
		App.Auth.login('facebook');
		this.home();
	},

	loginTwitter: function(){
		App.Auth.login('twitter');
		this.home();
	},

	loginGithub: function(){
		App.Auth.login('github');
		this.home();
	},

	logout: function(){
		App.Auth.logout();
		this.home();
	},

	editProfile: function(){
		debugger;
		var userModel = App.Users.find(function(u) { return u.isCurrent; });
		var profileView = new App.Views.Profile({ model: userModel });
		profileView.render();
	},

	_renderHeader: function(){
		this.headerView = this.headerView || new App.Views.Header();
		this.headerView.user = App.CurrentUser;
		this.headerView.render();
	},

	_firebaseUpdated: function(){
		var userModel = App.Users.find(function(u){
			return u.get('providerId') === App.CurrentUser.providerId;
		});

		if (!userModel) {
			userModel = new App.Models.User(App.CurrentUser);
			userModel.isCurrent = true;
			App.Users.add(userModel);
		} else {
			userModel.isCurrent = true;
		}
	}

});

App.Router = new Router();
Backbone.history.start();
