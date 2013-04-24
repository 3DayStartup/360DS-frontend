define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participantRole:	{ type: 'Select', options: ['Participant', 'Organizer', 'Mentor'] },
        name:				'Text',
        email:      		{ validators: ['required', 'email'] },
        profilePicture: 	'Text',
        company: 		'Text',
        program: 			{ type: 'Select', options: ['[REQUIRED]', '3DS RetailMeNot Spring 2013', '3DS University of Houston Spring 2013', '3DS TAMU Spring 2013'], validators: ['required'] },
        fieldOfStudy: 		'Text',
        degreeProgram:		{ type: 'Select', options: ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate', 'Juris Doctorate'] },
        university: 		'Text',
        website:			{ validators: [ 'url'] },
        linkedinUrl:			'Text',
        twitterUrl:			'Text'
        
        
	},
	defaults: function() {
		return {
			'email' : "your_email@here.com",
			'name' : 'Firstname Lastname Here',
			'participantRole': "Participent",
	     	'company': 			'',
        	'program': 			'',
        	'fieldOfStudy': 	'',
        	'degreeProgram':	'',
        	'university': 		'',
        	'website':			'',
        	'linkedinUrl':		'',
        	'twitterUrl': 		''
		}
	}
});
return UserModel;

});