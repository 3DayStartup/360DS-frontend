define(["jquery", "underscore", "backbone",  'backbone_forms'], function($, _, Backbone, BackboneForm) {

	var UserModel = Backbone.Model.extend({
		
	schema: {
        participantRole:	{ type: 'Select', options: ['participant', 'organizer', 'mentor'] },
        name:				'Text',
        email:      		{ validators: ['required', 'email'] },
        profilePicture: 	'Text',
        company: 		'Text',
        team: 			{ type: 'Select', options: ['3DS [school name season year]1', '3DS [school name season year]2', '3DS [school name season year]3'] },
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
			'participantRole': "participent",
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