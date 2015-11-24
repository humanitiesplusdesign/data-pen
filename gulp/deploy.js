var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('deploy', ['dist'], function() {
  return gulp.src("./dist/**/*").pipe($.ghPages());
});
