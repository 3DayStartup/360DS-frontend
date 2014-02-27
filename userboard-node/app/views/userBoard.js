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