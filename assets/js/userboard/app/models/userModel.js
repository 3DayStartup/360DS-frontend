define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participant_role:      { type: 'Select', options: ['Developer', 'Designer', 'Wildcard', 'Mentor'] },
        name:       'Text',
        email:      { validators: ['required', 'email'] },
        providerId: 'Text'
	},
	defaults: function() {
		return {
			'email' : "your_email@here.com",
			'name' : 'Firstname Lastname Here',
			'participant_role': "role",
			"providerId": ""
		}
	}
});
return UserModel;

});