
var     gulp 		= require('gulp'),
	browserSync     = require('browser-sync'),
	prefixer 	= require('gulp-autoprefixer'),
	sass 		= require('gulp-ruby-sass'),
	reload 		= browserSync.reload;


gulp.task('styles', function() {
	return gulp.src('sass/*.scss')
	.pipe(sass({
		sourcemap  : true,
		noCache    : true, 
		style      : "nested" // compact, 
	}))
	.pipe(gulp.dest('css'))
	.pipe(reload({stream:true}))
	.pipe(prefixer([ 
		'ie >= 8',
		'ie >= 7',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.4',
		'bb >= 10'
		], {cascade: true }));
});

// start server
gulp.task('browser-sync', function() {
    browserSync({
    	logLevel: "info",
    	logConnections: true,
    	notify: false,
        server: {
            baseDir: "./"
        }
    });
});

// refresh all browser
gulp.task('refresh', function () {
    browserSync.reload();
});


gulp.task('default', ['browser-sync'], function(){
	gulp.watch("sass/*.scss", ['styles']);
    gulp.watch("*.html", ['refresh']);
});
