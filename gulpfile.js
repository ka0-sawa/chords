var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    browserify('./js/src/index.js', { debug: true })
    .transform(babelify)
    .on("error", function (err) { console.log("Error : " + err.message); })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js/'))
});