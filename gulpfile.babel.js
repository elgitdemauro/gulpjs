/* ----------------- */
/* Gulp Task Runner
/* ----------------- */
import gulp         from 'gulp';
import plugins      from 'gulp-load-plugins';
import autoprefixer from 'gulp-autoprefixer';
import critical     from 'critical';
import babelify     from 'babelify';
import browserSync  from 'browser-sync';
import browserify   from 'browserify';

/* ----------------- */
/* Styles
/* ----------------- */
gulp.task('styles', () => {
    return gulp.src('./sass/*.scss')
        .pipe(plugins().sourcemaps.init())
        .pipe(plugins().sass({
            'outputStyle': 'compressed' // compact, nested
        }).on('error', plugins().sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins().sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

/* ----------------- */
/* Development
/* ----------------- */
gulp.task('dev', ['styles'], () => {
    browserSync({
        'server': './',
        'snippetOptions': {
            'rule': {
                'match': /<\/body>/i,
                'fn': (snippet) => snippet
            }
        }
    });
    gulp.watch('./sass/*.scss', ['styles']);
    gulp.watch('./*.html', browserSync.reload);
});

/* ----------------- */
/* Taks
/* ----------------- */
gulp.task('default', ['dev']);