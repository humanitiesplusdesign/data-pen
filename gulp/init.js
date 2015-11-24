var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('init', ['bower', 'tsd'], function() {
  return gulp.src("tsd.json").pipe($.notify("Initialization finished"));
});

gulp.task('bower', function() {
  return $.bower();
});

gulp.task('tsd', function(callback) {
  return $.tsd({
    command: 'reinstall',
    config: 'tsd.json',
    latest: true
  }, callback);
});
