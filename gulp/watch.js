var gulp = require('gulp');

gulp.task('watch', function(){
  gulp.watch('./src/**/*.jade', ['partials']);
  gulp.watch('./src/**/*.js', ['scripts']);
  gulp.watch('./src/**/*.styl', ['styles']);
  gulp.watch('./src/index.jade', ['index']);
})
