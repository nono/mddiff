var gulp   = require('gulp');
var maps   = require('gulp-sourcemaps');
var to5    = require('gulp-6to5');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  gulp.src(['bin/*', 'src/*.es6'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('scripts', function() {
  return gulp.src(['src/*.es6'])
    .pipe(maps.init())
    .pipe(to5())
    .pipe(concat('mddiff.js'))
    .pipe(maps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', function() {
  gulp.watch(['bin/*'], ['lint']);
  gulp.watch(['src/*.es6'], ['lint', 'scripts']);
});

gulp.task('default', ['watch', 'lint', 'scripts']);
