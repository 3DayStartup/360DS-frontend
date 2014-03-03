/* global App:true, Backbone:true */

App.Collections.Users = Backbone.Firebase.Collection.extend({
	model: App.Models.User,

	initialize: function(models, options){
		this.firebase = options.firebase;
	}
});