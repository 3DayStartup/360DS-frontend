'use strict';

module.exports = function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/app/*.*'],
		jst: {
			compile: {
				files: {
					'public/app/templates.js': ['app/templates/*.html']
				}
			}
		},
		concat: {
			app: {
				src: [
					'app/models/*.js',
					'app/collections/*.js',
					'app/views/*.js',
					'app/router.js'
				],
				dest: 'public/app/app.js'
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'public'
				}
			}
		},
		watch: {
			all: {
				files: ['app/**/*.*'],
				tasks: [
					'clean',
					'jst',
					'concat'
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'clean',
		'jst',
		'concat',
		'connect',
		'watch'
	]);

};