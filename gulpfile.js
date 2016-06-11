'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('build', ['js', 'sass', 'html', 'images'], function () {
});

gulp.task('js', function () {
		return gulp.src([
			'./bower_components/angular/angular.js',
			'./bower_components/angular-animate/angular-animate.js',
			'./bower_components/angular-ui-router/release/angular-ui-router.js',
			'./bower_components/angular-aside/dist/js/angular-aside.js',
			'./bower_components/angular-bootstrap/ui-bootstrap.js',
			'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'./bower_components/lodash/dist/lodash.js',
			'./app/**/*.js'
		])
	  	.pipe(concat('szpeje.js'))
			// .pipe(ngAnnotate())
		//  	.pipe(uglify())
	    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./app/szpeje.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {

	gulp.src('./app/**/*.tpl.html')
    .pipe(gulp.dest('./dist/tpl'));

  return gulp.src(['./app/index.html', './app/app.html'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function () {

	gulp.src('./app/**/*.jpg')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./app/**/*.html', ['html', browserSync.reload]);
  gulp.watch('./app/**/*.js', ['js', browserSync.reload]);
  gulp.watch('./app/**/*.jpg', ['images', browserSync.reload]);
  return gulp.watch('./app/**/*.scss', ['sass', browserSync.reload]);
});

gulp.task('browser-sync', ['nodemon', 'build', 'watch'], function() {
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
		script: 'server/index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
