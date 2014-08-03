
var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	prefix 		= require('gulp-autoprefixer'),
	sass 		= require('gulp-ruby-sass'),
	reload 		= browserSync.reload;


// watch styles
gulp.task('styles', function() {
	return gulp.src('sass/*.scss')
	.pipe(sass({
		sourcemap	: false,
		noCache		: true, 
		style		: "nested" // compact, nested
	}))
	.pipe(reload({stream:true}))
	.pipe(prefix(["last 2 versions", "> 1%", "Explorer 7", "Explorer 8", "Android 2"], { cascade: true }))
    .pipe(gulp.dest('css'));
});


// watch js
gulp.task('js', function () {
	return gulp.src('js/*js')
	.pipe(browserSync.reload({stream:true}));
});


// watch js
gulp.task('img', function () {
	return gulp.src('img/*')
	.pipe(browserSync.reload({stream:true}));
});


// start server
gulp.task('browser-sync', function() {
	browserSync.init(["*html"],{
		logLevel: "info",
		logConnections: true,
		notify: false,
		host: "192.123.456",
		port: 8000,
		open: true,
		//files: "app/css/*.css",	// BrowserSync can watch your files as you work
		server: {
			baseDir: "./" 			// Serve files
		}
	});
});


// refresh all browser
gulp.task('refresh', function () {
	browserSync.reload();
});


// task default
gulp.task('default', ['browser-sync'], function(){
	gulp.watch("sass/*.scss", ['styles']);
	gulp.watch("js/*", ['js']);
	gulp.watch("img/*", ['img']);
});

