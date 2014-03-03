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
