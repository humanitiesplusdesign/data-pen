var gulp = require('gulp');
var $ = require("gulp-load-plugins")();

gulp.task('watch', ['build'], function() {
  $.watch("app/**/*.styl", $.batch(function (events, done) { gulp.start('styles',done); }));
  $.watch("app/components/**/*.ts", $.batch(function (events, done) { gulp.start('scripts',done); }));
  $.watch("app/components/**/*.ts", { events:['add','unlink'] }, $.batch(function (events, done) { gulp.start('wire:scripts-to-templates',done); }));
  $.watch("app/**/*.pug", $.batch(function (events, done) { gulp.start('templates',done); }));
  $.watch("bower.json", $.batch(function (events, done) { gulp.start('wire',done); }));
});
