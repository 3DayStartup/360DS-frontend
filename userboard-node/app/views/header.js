/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.Header = Backbone.View.extend({
	template: JST['app/templates/header.html'],

	render: function() {
		this.$el.html(this.template({ model: this.model }));
		return this;
	}
});