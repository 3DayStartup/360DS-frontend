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
