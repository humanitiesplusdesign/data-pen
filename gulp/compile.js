var gulp = require('gulp');
var inject = require('gulp-inject');
var clean = require('gulp-rimraf');
var connect = require('gulp-connect');
var bowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var es = require('event-stream');

// Scripts
gulp.task('scripts', function(){
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./app/'))
    .pipe(connect.reload())
})

// Styles
gulp.task('styles', function(){
  return gulp.src('./src/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload())
})

// Partials
gulp.task('partials', function(){
  return gulp.src(['./src/**/*.jade','!./src/index.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload())
})

// Index
gulp.task('index', ['scripts','styles','partials'], function(){
  return gulp.src('./src/index.jade')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {ignorePath:'/app', name: 'bower'}))
    .pipe(inject(es.merge(
        gulp.src(['./app/**/*.css','!./app/bower_components/**/*.css'], {read:false}),
        gulp.src(['./app/**/*.js','!./app/bower_components/**/*.js'], {read:false})
      ),
      {ignorePath:'/app'}))
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload())
})

// Cleaning
gulp.task('clean', function(){
  return gulp.src('./app/**/*', {read:false})
  .pipe(clean())
})

// Compile
gulp.task('compile', ['scripts','styles','partials','index']);
