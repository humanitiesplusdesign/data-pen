var gulp = require('gulp');
var nib = require('nib');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src("app/styles/main.styl")
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.stylus({ use: [nib()] }))
    .pipe($.autoprefixer("last 1 version"))
    .pipe(gulp.dest(".tmp/styles"));
});

var tsProject = $.typescript.createProject('tsconfig.json',{noExternalResolve:true});
gulp.task('scripts', function() {
  return tsProject.src()
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject)).js
    .pipe($.typescriptAngular({ moduleName: 'app' }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(".tmp"));
});

gulp.task('templates', function() {
  return gulp.src("app/**/*.pug")
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.cached())
    .pipe($.sourcemaps.init())
    .pipe($.pug({pretty: true}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(".tmp"));
});

gulp.task('clean', function(cb){
  return require('del')(['.tmp', 'dist'], cb);
});

gulp.task('build', function(cb){
  return require('run-sequence')('clean', ['wiredep', 'templates', 'styles', 'scripts'], cb);
});
