app = {};

require.config({
	urlArgs : "bust=v1" + (new Date()).getTime(),

	// 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
	paths : {
		// Core Libraries
		modernizr : "libs/modernizr-2.6.2-respond-1.1.0.min",
		jquery : "https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
		bootstrap : "libs/bootstrap.min",
		holder : "libs/holder",
		underscore : "libs/underscore-min",
		backbone : "libs/backbone-min",
		localstorage : "libs/backbone.localStorage-min"

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim : {

		backbone : {
			deps : ["underscore", "jquery"],
			exports : "Backbone" //attaches "Backbone" to the window object
		},
		bootstrap : {
			deps : ["modernizr", "jquery", "holder"],
			exports : "bootstrap"
		},
		underscore : {
			exports : "_"
		}

	} // end Shim Configuration

});

require(["jquery", "underscore", "backbone", "app/router", "bootstrap"], function($, _, Backbone, Router, Bootstrap) {

	console.log("##### Router start");
	$(function() {
		router = new Router();
		router.start()
	});
	
	/*
	 // Init the router
	 var router = new Router();

	 //Event Handlers
	 $('#county-list').on("click", ".ui-li", function(){
	 var countyId = $(this).attr("data-id");
	 router.navigate("county/"+countyId, {trigger: true});
	 });

	 $('#senate-list').on("click", ".ui-li", function(){
	 var senateId = $(this).attr("data-id");
	 router.navigate("senate/"+senateId, {trigger: true});
	 });

	 $('#house-list').on("click", ".ui-li", function(){
	 var senateId = $(this).attr("data-id");
	 router.navigate("house/"+senateId, {trigger: true});
	 });
	 */

}); 