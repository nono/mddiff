var gulp   = require('gulp');
var maps   = require('gulp-sourcemaps');
var to5    = require('gulp-6to5');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var mocha  = require('gulp-mocha');

gulp.task('lint', function () {
  return gulp.src(['bin/*', 'src/*.js', 'test/*.js'])
    .pipe(eslint({
      env: { node: true, mocha: true },
      rules: { strict: 0 }
    }))
    .pipe(eslint.format());
});

gulp.task('scripts', function() {
  return gulp.src(['src/*.js'])
    .pipe(maps.init())
    .pipe(to5())
    .pipe(concat('mddiff.js'))
    .pipe(maps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('test', ['scripts'], function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'dot' }));
});

gulp.task('watch', function() {
  gulp.watch(['bin/*'], ['lint']);
  gulp.watch(['src/*.js'], ['lint', 'scripts', 'test']);
  gulp.watch(['test/*.js'], ['lint', 'test']);
});

gulp.task('build', ['lint', 'scripts', 'test']);

gulp.task('default', ['watch', 'build']);
