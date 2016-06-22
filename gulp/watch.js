var gulp = require('gulp');
var $ = require("gulp-load-plugins")();

gulp.task('watch', ['build'], function() {
  $.watch("app/styles/**/*.styl", $.batch(function (events, done) { gulp.start('styles',done); }));
  $.watch("app/scripts/**/*.ts", { events:['change'] }, $.batch(function (events, done) { gulp.start('scripts',done); }));
  $.watch("app/scripts/**/*.ts", { events:['add','unlink'] }, $.batch(function (events, node) { require('run-sequence')('wire:scripts','scripts',done); }));
  $.watch("app/**/*.pug", $.batch(function (events, done) { gulp.start('templates',done); }));
  $.watch("bower.json", $.batch(function (events, done) { gulp.start('wire',done); }));
});
