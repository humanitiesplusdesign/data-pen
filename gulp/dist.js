var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var uglifySaveLicense = require('uglify-save-license');
var $ = require('gulp-load-plugins')();

gulp.task('dist:partials', function() {
  return gulp.src(".tmp/partials/**/*.html")
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.ngHtml2js({
      moduleName: "app",
      prefix: "partials/"
    }))
    .pipe(gulp.dest(".tmp/partials"));
});

gulp.task('dist:html', ['dist:partials'], function() {
  var jsFilter = $.filter("**/*.js", {restore: true});
  var cssFilter = $.filter("**/*.css", {restore: true});
  return gulp.src(".tmp/*.html")
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:html(1) " + path; }))
    .pipe($.size({ title: 'dist:html(1)' }))
    .pipe($.inject(gulp.src(".tmp/partials/**/*.js"), {
      read: false,
      starttag: "<!-- inject:partials-->",
      endtag: "<!-- endinject-->",
      addRootSlash: false,
      addPrefix: ".."
    }))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.rev())
    .pipe($.print(function(path) { return "dist:html-js(1) " + path; }))
    .pipe($.size({ title: 'dist:html-js(1)' }))
    .pipe($.ngAnnotate()).pipe($.uglify({ preserveComments: uglifySaveLicense }))
    .pipe($.print(function(path) { return "dist:html-js(2) " + path; }))
    .pipe($.size({ title: 'dist:html-js(2)' }))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.rev())
    .pipe($.print(function(path) { return "dist:html-css(1) " + path; }))
    .pipe($.size({ title: 'dist:html-css(1)' }))
    .pipe($.replace(/url\(".*?\/(\w+\.(eot|svg|ttf|woff|woff2).*?)"\)/g, 'url("$1")'))
    .pipe($.replace(/url\(".*?\/(\w+?\.(png|jpg|jpeg))"\)/g, 'url("$1")'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.print(function(path) { return "dist:html-css(2) " + path; }))
    .pipe($.size({ title: 'dist:html-css(2)' }))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(gulp.dest("dist"))
    .pipe($.print(function(path) { return "dist:html(2) " + path; }))
    .pipe($.size({ title: 'dist:html(2)' }));
});

gulp.task('dist:images', function() {
  return gulp.src("app/images/**/*")
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:images(1) " + path; }))
    .pipe($.size({ title: 'dist:images(1)' }))
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest("dist/images"))
    .pipe($.print(function(path) { return "dist:images(2) " + path; }))
    .pipe($.size({ title: 'dist:images(2)' }));
});

gulp.task('dist:cssimages', function() {
  return gulp.src(mainBowerFiles("*/*.{png,jpg,jpeg}"))
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:cssimages(1) " + path; }))
    .pipe($.size({ title: 'dist:cssimages(1)' }))
    .pipe($.flatten())
    .pipe(gulp.dest("dist/styles"))
    .pipe($.print(function(path) { return "dist:cssimages(2) " + path; }))
    .pipe($.size({ title: 'dist:cssimages(2)' }));
});

gulp.task('dist:cssfonts', function() {
  return gulp.src(mainBowerFiles("**/*.{eot,svg,ttf,woff,woff2}"))
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:cssfonts(1) " + path; }))
    .pipe($.size({ title: 'dist:cssfonts(1)' }))
    .pipe($.size())
    .pipe($.flatten())
    .pipe(gulp.dest("dist/fonts"))
    .pipe($.print(function(path) { return "dist:cssfonts(2) " + path; }))
    .pipe($.size({ title: 'dist:cssfonts(2)' }));
});

gulp.task('dist:refs', function() {
  return gulp.src(mainBowerFiles("**/*.{svg,swf}"), { base: 'app/' })
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:refs(1) " + path; }))
    .pipe($.size({ title: 'dist:refs(1)' }))
    .pipe(gulp.dest("dist"))
    .pipe($.print(function(path) { return "dist:refs(2) " + path; }))
    .pipe($.size({ title: 'dist:refs(2)' }));
});

gulp.task('dist:refimages', function() {
  return gulp.src(mainBowerFiles("**/*.{png,jpg,jpeg}"), { base: 'app/' })
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.stack %>") }))
    .pipe($.print(function(path) { return "dist:refimages(1) " + path; }))
    .pipe($.size({ title: 'dist:refimages(1)' }))
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest("dist"))
    .pipe($.print(function(path) { return "dist:refimages(2) " + path; }))
    .pipe($.size({ title: 'dist:refimages(2)' }));
});

gulp.task('dist:finished', function() {
  return gulp.src("dist/index.html").pipe($.notify("Distribution finished"));
});

gulp.task('dist', function(cb) {
  return require("run-sequence")('build', ['dist:html', 'dist:refimages', 'dist:refs', 'dist:cssimages', 'dist:cssfonts', 'dist:images'], 'dist:finished', cb);
});
