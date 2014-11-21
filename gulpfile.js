// Getting gulp
require('require-dir')('./gulp');
var gulp = require('gulp');
var open = require('open');
var connect = require('gulp-connect')
// Serve
gulp.task('serve', ['compile', 'watch'], function(){
  connect.server({
    port: 8000,
    root: 'app',
    livereload: true
  })
  return open('http://localhost:8000');
})
// Require gulp tasks
gulp.task('default', ['serve']);
