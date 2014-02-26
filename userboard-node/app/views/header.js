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