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