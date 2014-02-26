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
