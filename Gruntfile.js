module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			dist: {
				src: ['src/**/*.js'],
				dest: 'lib/gimme.js',
				options: {
					footer: "\n\n})(this);"
				}
			}
		}, // concat

		uglify: {
			dist: {
				files: {
					'lib/gimme.min.js': ['<%= concat.dist.dest %>']
				}
				
			}
		}, // uglify

		watch: {
			files: ['<%= concat.dist.src %>', '<%= mochaTest.test.src'],
			tasks: ['concat', 'mochaTest']
		}, // watch

		mochaTest: {
			test: {
				src: ['test/**/*.js']
			}
		}, // mochaTest
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['concat', 'uglify', 'mochaTest']);
	grunt.registerTask('test', ['concat', 'mochaTest']);
}