var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = require("gulp-load-plugins")();

gulp.task('serve', ['watch'], function() {
  browserSync.init(['.tmp/styles/*.css','app/images/**/*'],{ server: { baseDir: ['app','.tmp'] }, ghostMode: false });
  $.watch([
   ".tmp/*.html",
   ".tmp/scripts/**/*.js",
   ".tmp/scripts/*.js",
   "app/**/*.js",
   ".tmp/partials/**/*.html",
   ".tmp/partials/*.html",
   ".tmp/partials/**/*.js",
   ".tmp/partials/*.js"],
   $.batch(function (events, done) { browserSync.reload(); done(); }));
});

gulp.task('serve:dist', function() {
  browserSync.init({ server: { baseDir: 'dist' }, ghostMode: false });
});

gulp.task('lserve', ['watch'], function() {
  gulp.src(['.tmp', 'app']).pipe($.webserver({
    livereload: true,
    open: true,
    port: 3000
  }));
});

gulp.task('lserve:dist', function() {
  gulp.src('dist').pipe($.webserver({
    livereload: true,
    open: true,
    port: 3000
  }));
});

gulp.task('sserve', ['watch'], function() {
  gulp.src(['.tmp', 'app']).pipe($.webserver({
    livereload: false,
    open: true,
    port: 3000
  }));
});

gulp.task('sserve:dist', function() {
  gulp.src('dist').pipe($.webserver({
    livereload: false,
    open: true,
    port: 3000
  }));
});
