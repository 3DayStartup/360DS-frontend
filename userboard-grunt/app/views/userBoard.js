/* global App:true, Backbone:true, JST:true */

'use strict';

App.Views.UserBoard = Backbone.Views.extend({
	el: $('div#userBoard'),

	template: JST['app/templates/userBoard.html'],

});