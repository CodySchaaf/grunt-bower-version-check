/*
 * grunt-bower-version-check
 * https://github.com/anchann/grunt-bower-version-check
 *
 * Copyright (c) 2014 anchann
 * Licensed under the MIT license.
 */

module anchann.grunt.bowerVersionCheck {
	export class BowerVersionCheck {
		constructor(private grunt: IGrunt) {
		}

		public run(): void {
			var grunt = this.grunt;

			// Please see the Grunt documentation for more information regarding task
			// creation: http://gruntjs.com/creating-tasks

			grunt.registerMultiTask('bower_version_check', 'Check versions of bower components against bower.json and bail on (or otherwise handle) mismatches.', function() {
				// Merge task-specific and/or target-specific options with these defaults.
				var options = this.options({
					punctuation: '.',
					separator: ', '
				});

				// Iterate over all specified file groups.
				this.files.forEach(function(f) {
					// Concat specified files.
					var src = f.src.filter(function(filepath) {
						// Warn on and remove invalid source files (if nonull was set).
						if (!grunt.file.exists(filepath)) {
							grunt.log.warn('Source file "' + filepath + '" not found.');
							return false;
						} else {
							return true;
						}
					}).map(function(filepath) {
						// Read file source.
						return grunt.file.read(filepath);
					}).join(grunt.util.normalizelf(options.separator));

					// Handle options.
					src += options.punctuation;

					// Write the destination file.
					grunt.file.write(f.dest, src);

					// Print a success message.
					grunt.log.writeln('File "' + f.dest + '" created.');
				});
			});
		}
	}
}
