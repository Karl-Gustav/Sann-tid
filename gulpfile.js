'use strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	sourceDir = './',
	destDir = 'dist/';

gulp.task('default', ['build']);

gulp.task('build', ['use-min']);

gulp.task('use-min', ['clean-dist'], function(){
	return gulp.src(
		[
			sourceDir + 'html/**/*.html',
			sourceDir + 'html/images/*',
			sourceDir + '**/*.py',
			sourceDir + 'app.yaml',
			sourceDir + 'main.py'

		],
		{base: sourceDir})
		.pipe($.if(isIndexHtml, $.usemin({
			js: [$.ngAnnotate(), $.uglify(), $.rev()],
			jslib: [$.rev()],
			css: [$.minifyCss(), 'concat', $.rev()]
		})))
		.pipe(gulp.dest(destDir));
})

gulp.task('clean-dist', function (cb) {
	del(destDir,cb);
});

function isIndexHtml (file) {
	return !!file.path.match('index\\.html$');
}
