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