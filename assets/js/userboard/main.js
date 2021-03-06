app = {};

require.config({
	urlArgs : "bust=" + (new Date()).getTime(),

	// 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
	paths : {
		// Core Libraries
		modernizr : "libs/modernizr-2.6.2-respond-1.1.0.min",
		jquery : "https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
		bootstrap : "libs/bootstrap.min",
		holder : "libs/holder",
		underscore : "libs/underscore-min",
		backbone : "libs/backbone-min",
		backbone_forms : "libs/backbone-forms.min",
		backfire : "libs/backbone-firebase",
		firebase : "https://cdn.firebase.com/v0/firebase",
		firebaseAuthClient: "https://cdn.firebase.com/v0/firebase-auth-client",
		localstorage : "libs/backbone.localStorage-min",
		md5: "libs/md5"
	},
	shim : {

		backbone : {
			deps : ["underscore", "jquery"],
			exports : "Backbone"
		},
		bootstrap : {
			deps : ["modernizr", "jquery", "holder"],
			exports : "bootstrap"
		},
		underscore : {
			exports : "_"
		},
		backfire : {
			deps : ["firebase"],
			exports: "Backfire"
		},
		Firebase: {
			deps: [],
			exports: "Firebase"
		},
		FirebaseAuthClient: {
			deps: [],
			exports: "FirebaseAuthClient"
		}
	}
});

require(["jquery", "underscore", "backbone", "app/router", "bootstrap"], function($, _, Backbone, Router, Bootstrap) {

	$(function() {
		window.router = new Router();
		window.router.start();
	});
	

}); 