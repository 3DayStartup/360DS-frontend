define([
	'jquery', 'underscore', 'backbone', 'backbone_forms',
	'app/collections/userList', 'app/models/userModel',  'app/views/userView',  "app/views/userListView"], 
function($, _, Backbone, BackboneForms, UserList, UserModel, UserView, UserListView) {
	var UserAuth = Backbone.View.extend({
		el: "body.page",
		initialize: function(){

			var $header = $('#super-header');
			var $notLoggedIn = $('<span class="notLoggedIn"></span>');
			var $loggedIn = $('<span class="loggedIn" style="display:none;"></span>');
			// TODO: remove inline styles when ready
			$notLoggedIn.append('<button class="login btn btn-primary" data-provider="facebook" ><i class="icon-facebook"></i> Facebook Login</button> <button class="login btn btn-primary" data-provider="github" ><i class="icon-github-alt"></i> Github Login</button>');
			$loggedIn.append('<!--<span class="userInfo"></span>--> <a class="btn editProfile" href="http://online.3daystartup.org/edit-profile/"><i class="icon-user	"></i>Edit Profile</a> <button class="logout btn-mini btn-info">Logout</button>');
			this.$('#super-header').append($notLoggedIn);
			this.$('#super-header').append($loggedIn);

			
			userRef = new Firebase('https://360ds.firebaseio.com');
			authClient = new FirebaseAuthClient(userRef, function(error, user) {
				  if (error) {
				    // console.log(error);
				  } else if (user) {
				  	currentUser = user;
				    $('#super-header .loggedIn').show();
				    $('#super-header .loggedIn .userInfo').text('User ID: ' + user.id + ', Provider: ' + user.provider);
				    $('#super-header .notLoggedIn').hide();

				    // This is a bad hack. 
				    // We should use a class to target the links
				    $('a[href="http://online.3daystartup.org/edit-profile/"]').show();
				    $('#content').show();
				    $('.loginRequired').hide();				    

				    if($('body').hasClass("home")) {
				    	userList = new UserList();
				    	userListView = new UserListView({collection: userList});
				    	userList.firebase.on('value', function(){
				    		var user = currentUser;
				    		var providerId = user.provider+":"+user.id;
				    		var userExists = userList.where({"providerId": providerId});
				    		if (userExists[0] && userExists[0].get('program')) {
				    			userListView.renderByProgram(userExists[0].get("program"));		
				    		}
				    		
				    	});				    	
				    }				    
				    
				  } else {
				    $('#super-header .loggedIn').hide();
				    $('#super-header .loggedIn  .userInfo').text("");
				    $('#super-header .notLoggedIn').show();

				    // This is a bad hack. 
				    // We should use a class to target the links
				    $('a[href="http://online.3daystartup.org/edit-profile/"]').hide();

				    $('#content').hide();
				    $('#content').after("<h3 class='loginRequired'>You must login in order to view content.</h3>");

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
				    		"providerId": user.provider+":"+user.id,
				    		"profilePicture": "https://graph.facebook.com/"+user.username+"/picture?type=large"
				    	});
				    	
			    	} else if(user.provider === "github") {
			    		newUser = new UserModel({
				    		"name": user.name,
				    		"email": user.email,
				    		"providerId": user.provider+":"+user.id,
				    		"profilePicture": user.avatar_url
				    	});
			    	}
			    	var userExists = userList.where({"providerId": providerId});
			    	if(userExists.length === 0 && typeof(newUser) !== "undefined" )  {
			    		userList.add(newUser.attributes);
			    		$('a[href="http://online.3daystartup.org/edit-profile/"]').hide();		    		
			    	} else {
			    		$('a[href="http://online.3daystartup.org/edit-profile/"]').show();
			    		if($('body').hasClass("home") || window.location.toString().indexOf("home") > 0 ) {
			    			userListView.renderByProgram(userExists[0].get("program"));
			    		}			    		
			    	}

			    	$('a[href="http://online.3daystartup.org/edit-profile/"]').unbind("click");
			    	$('a[href="http://online.3daystartup.org/edit-profile/"]').on("click", function(event){
						event.preventDefault();
						var providerId = user.provider+":"+user.id;
						var retrievedUser = userList.where({"providerId": providerId});
						if(retrievedUser.length !== 0) {							
				      		var form = new Backbone.Form({
				        		model: retrievedUser[0]
				    		}).render();
				    		var $modal = $('<div>');
				    		$modal.addClass('modal');
				    		$modal.addClass('fade');
				    		$modal.html(form.el);
				    		$modal.prepend('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
				    		$modal.append('<div class="modal-footer">'+
											'<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Save Changes</button>'+
											'</div>');
				    		$modal.modal();				    		
				    		form.on('blur', function(form) {
				    			form.commit();
							});
							$modal.on('keypress', 'input', function(event) {
				    			if(event.charCode == 13) {
									form.commit();
								}
							});
							$modal.on('change', 'select', function(event) {
								form.commit();
							});
						}						
					});

					if(userExists[0] && (userExists[0].get("program") === '' || userExists[0].get("program") === '[REQUIRED]') )  {
		    			$('a[href="http://online.3daystartup.org/edit-profile/"]')[0].click()
		    		}

			    }
			});			
		},
		// Binded a fake userList relationship
		userList: undefined,
		events: {
			"click #super-header .login": "login",
			"click #super-header .logout": "logout"
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