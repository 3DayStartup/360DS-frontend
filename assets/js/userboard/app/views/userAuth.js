define(['jquery', 'underscore', 'backbone', 'backbone_forms', 'app/collections/userList', 'app/models/userModel',  'app/views/userView'], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView) {
	var UserAuth = Backbone.View.extend({
		el: "body.page",
		initialize: function(){

			var $header = $('#header');
			var $notLoggedIn = $('<span class="notLoggedIn"></span>');
			var $loggedIn = $('<span class="loggedIn" style="display:none;"></span>');
			// TODO: remove inline styles when ready
			$notLoggedIn.append('<button class="login btn btn-primary" data-provider="facebook" ><i class="icon-facebook"></i> Facebook Login</button> <button class="login btn btn-primary" data-provider="github" ><i class="icon-github"></i> Github Login</button>');
			$loggedIn.append('<span class="userInfo"></span> <button class="logout btn">Logout</button>');
			this.$('#header').append($notLoggedIn);
			this.$('#header').append($loggedIn);

			var currentUser = undefined;
			userRef = new Firebase('https://360ds.firebaseio.com');
			authClient = new FirebaseAuthClient(userRef, function(error, user) {
				  if (error) {
				    console.log(error);
				  } else if (user) {
				  	currentUser = user;
				    $('#header .loggedIn').show();
				    $('#header .loggedIn .userInfo').text('User ID: ' + user.id + ', Provider: ' + user.provider);
				    $('#header .notLoggedIn').hide();
				  } else {
				    $('#header .loggedIn').hide();
				    $('#header .loggedIn  .userInfo').text("");
				    $('#header .notLoggedIn').show();
				  }
				});

			// The best "convention" (hack) to wait for firebase's fetch to finish.
			userList.firebase.on('value', function(snapshot){
				var user = currentUser;
				    
			    if(typeof(user) !== "undefined" && typeof(user.provider) !== "undefined" ) {
			    	var newUser = undefined;
			    	var providerId = user.provider+":"+user.id;
			    	
			    	if(user.provider === "facebook") {
				    	newUser = new UserModel({
				    		"name": user.name,
				    		"email": "",
				    		"gravatar_email": "",
				    		"providerId": user.provider+":"+user.id,
				    		"profile_picture": "https://graph.facebook.com/"+user.username+"/picture?type=normal"
				    	});
				    	
			    	} else if(user.provider === "github") {
			    		newUser = new UserModel({
				    		"name": user.name,
				    		"email": user.email,
				    		"gravatar_email": user.email,
				    		"providerId": user.provider+":"+user.id,
				    		"profile_picture": user.avatar_url
				    	});
			    	}
			    	var userExists = userList.where({"providerId": providerId});
			    	if(userExists.length === 0 && typeof(newUser) !== "undefined" )  {
			    		userList.add(newUser.attributes);		    		
			    	}
			    }
			});			
		},
		// Binded a fake userList relationship
		userList: undefined,
		events: {
			"click #header .login": "login",
			"click #header .logout": "logout",
		},
		login: function(event){
			var provider = $(event.currentTarget).data("provider");
			authClient.login(provider);
		},
		logout: function(event){
			authClient.logout();
		}
	});

	return UserAuth;
}); 