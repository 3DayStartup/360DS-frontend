define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

	var UserModel = Backbone.Model.extend({
	urlRoot: '/api-360ds.php/users',
	defaults: function() {
		return {
			//'date' : new Date(),
			
			'email' : "your_email@here.com",
			'name' : 'Firstname Lastname Here',
			'profile_picture': "/img/3dslogo.png"
		}
	}
});
return UserModel;
/*
 var user = new User({
 id: "1.json"
 // name:"Dirty Harry",
 // email:"bro@freeemail.net",
 // company:"3 Day Startup",
 // portfolio:"thebest.com"
 });

 user.fetch({
 error: function(model, response) {
 console.log("error response");
 console.log(response);
 },
 success: function(model, response){
 console.log("sucess response");
 console.log(response);
 console.log("fetch name "+user.get('email'));
 console.dir(user.toJSON());
 }
 });

 console.log("1st name "+user.get('email'));
 console.dir(user.toJSON());
 //user.set({company:"Jackrabbit Mobile"});
 user.fetch();
 console.log("2nd name "+user.get('email'));
 console.dir(user.toJSON());
 */
});