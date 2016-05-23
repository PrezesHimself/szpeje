'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('build', function () {
		return gulp.src([
				'./bower_components/angular/angular.js',
				'./bower_components/angular-ui-router/release/angular-ui-router.js',
				'./app/**/*.js',
				'!./app/szpeje.js'
		])
	  	.pipe(concat('szpeje.js'))
		.pipe(ngAnnotate())
	  	.pipe(uglify())
	    .pipe(gulp.dest('./app/'));
});

gulp.task('browser-sync', ['nodemon', 'build'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        browser: "google chrome",
		open: false,
        port: 7000,
	});
});
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
