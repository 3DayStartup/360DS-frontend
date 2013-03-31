define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participant_role:      { type: 'Select', options: ['Developer', 'Designer', 'Wildcard', 'Mentor'] },
        name:       'Text',
        email:      { validators: ['required', 'email'] },
        birthday:   'Date',
        gravatar_email: 'Text',
        password:   'Password',
        providerId: 'Text'
	},
	defaults: function() {
		return {
			'email' : "your_email@here.com",
			'name' : 'Firstname Lastname Here',
			'gravatar_email': "",
			'participant_role': "role",
			"providerId": ""
		}
	}
});
return UserModel;

});