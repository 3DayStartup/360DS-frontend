/* global App:true, Backbone:true, Firebase:true, FirebaseSimpleLogin:true */

'use strict';

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'logout': 'logout',
		'loginFacebook': 'loginFacebook',
		'loginTwitter': 'loginTwitter',
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

	loginTwitter: function(){
		this.home();
		this.homeView.login('twitter');
	},

	loginGithub: function(){
		this.home();
		this.homeView.login('github');
	}

});

App.Router = new Router();
Backbone.history.start();
