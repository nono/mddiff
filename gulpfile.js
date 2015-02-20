var gulp   = require('gulp');
var del    = require('del');
var maps   = require('gulp-sourcemaps');
var babel  = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');

gulp.task('clean', function() {
  del(['lib/*']);
});

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', 'package.json', 'bin/*.js', 'src/*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  return gulp.src(['src/*.js'])
    .pipe(maps.init())
    .pipe(babel())
    .pipe(concat('mddiff.js'))
    .pipe(maps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('test', ['scripts'], function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'dot' }));
});

gulp.task('watch', function() {
  gulp.watch(['bin/*.js'], ['lint']);
  gulp.watch(['src/*.js'], ['lint', 'scripts', 'test']);
  gulp.watch(['test/*.js'], ['lint', 'test']);
});

gulp.task('build', ['lint', 'clean', 'scripts', 'test']);

gulp.task('default', ['watch', 'build']);
