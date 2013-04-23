define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participantRole:	{ type: 'Select', options: ['Participant', 'Organizer', 'Mentor'] },
        name:				'Text',
        email:      		{ validators: ['required', 'email'] },
        profilePicture: 	'Text',
        company: 		'Text',
        program: 			{ type: 'Select', options: ['3DS Houston Spring 2013', '3DS Retail Me Not 2013', '3DS Austin Spring 2013'] },
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
        	'team': 			'',
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