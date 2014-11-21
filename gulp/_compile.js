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
  return gulp.src('./src/scripts/**/*.js')
    .pipe(gulp.dest('./app/scripts'))
    .pipe(connect.reload())
})

// Styles
gulp.task('styles', function(){
  return gulp.src('./src/styles/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./app/styles'))
    .pipe(connect.reload())
})

// Partials
gulp.task('partials', function(){
  return gulp.src('./src/partials/**/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./app/partials'))
    .pipe(connect.reload())
})

// Index
gulp.task('index', ['scripts','styles'], function(){
  return gulp.src('./src/index.jade')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {ignorePath:'/app', name: 'bower'}))
    .pipe(inject(es.merge(
        gulp.src('./app/styles/**/*.css', {read:false}),
        gulp.src('./app/scripts/**/*.js', {read:false})
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
