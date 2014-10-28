var gulp   = require('gulp');
var maps   = require('gulp-sourcemaps');
var to5    = require('gulp-6to5');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src(['src/*.es6'])
    .pipe(maps.init())
    .pipe(to5())
    .pipe(concat('all.js'))
    .pipe(maps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.es6'], ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
