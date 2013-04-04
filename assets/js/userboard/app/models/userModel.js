define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participant_role:	{ type: 'Select', options: ['participent', 'organizer', 'mentor'] },
        name:				'Text',
        email:      		{ validators: ['required', 'email'] },
        profile_picture: 	'Text',
        company: 			'Text',
        team: 				'Text',
        fieldOfStudy: 		'Text',
        degreeProgram:		{ type: 'Select', options: ['High School', 'Associate', 'Bachlor', 'Master', 'Doctorate', 'Juris doctorate'] },
        university: 		'Text',
        website:			{ validators: [ 'url'] },
        linkedInUser:			'Text',
        twitterUser:			'Text'
        
        
	},
	defaults: function() {
		return {
			'email' : "your_email@here.com",
			'name' : 'Firstname Lastname Here',
			'participant_role': "participent",
			"providerId": ""
		}
	}
});
return UserModel;

});