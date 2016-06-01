var gulp = require('gulp');
var sass = require('gulp-sass');

var source = "./src/";
var dest = "./dist/";

gulp.task('css', function () {
    return gulp.src(source + 'css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest + 'css'));
});

gulp.task('js', function () {
    return gulp.src(source + 'js/*.js')
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('default', ['css', 'js']);

gulp.task('watch', function () {
    gulp.watch(source + 'css/*.scss', ['default']);
    gulp.watch(source + 'js/*.js', ['default']);
});