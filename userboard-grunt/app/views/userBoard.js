/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.UserBoard = Backbone.View.extend({
	template: JST['app/templates/userBoard.html'],

	render: function(search){
		var models, self = this;

		if (search){
			models = this.collection.filter(function(model){
				return JSON.stringify(model.attributes).toLowerCase().indexOf(search) !== -1;
			});
		} else {
			models = this.collection.filter(function(model){
				return model.get('program') === self.model.get('program');
			});
		}

		this.$el.html(this.template({ models: models }));
		return this;
	}

});