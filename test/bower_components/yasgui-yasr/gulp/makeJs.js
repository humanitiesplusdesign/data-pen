var gulp = require("gulp"),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  concat = require("gulp-concat"),
  embedlr = require("gulp-embedlr"),
  jsValidate = require("gulp-jsvalidate"),
  source = require("vinyl-source-stream"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  streamify = require("gulp-streamify"),
  paths = require("./paths.js"),
  buffer = require("vinyl-buffer"),
  exorcist = require("exorcist"),
  optionalShim = require("./optionalShim.js"),
  notify = require("gulp-notify"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("browserify", function() {
  var bundler = browserify({ entries: ["./src/entry.js"], standalone: "YASR", debug: true }).transform(
    { global: true },
    optionalShim
  );
  for (var modName in require("../package.json").optionalShim) {
    bundler.exclude(modName);
  }
  return bundler
    .bundle()
    .pipe(exorcist(paths.bundleDir + "/" + paths.bundleFileName + ".js.map"))
    .pipe(source(paths.bundleFileName + ".js"))
    .pipe(gulp.dest(paths.bundleDir))
    .pipe(rename(paths.bundleFileName + ".min.js"))
    .pipe(buffer())
    .pipe(
      sourcemaps.init({
        loadMaps: true,
        debug: true
      })
    )
    .pipe(
      uglify({
        compress: {
          //disable the compressions. Otherwise, breakpoints in minified files don't work (sourcemaped lines get offset w.r.t. original)
          negate_iife: false,
          sequences: false
        }
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.bundleDir));
});

gulp.task("browserifyWithDeps", function() {
  var bundler = browserify({ entries: ["./src/entry.js"], standalone: "YASR", debug: true });

  return bundler
    .bundle()
    .pipe(exorcist(paths.bundleDir + "/" + paths.bundleFileName + ".bundled.js.map"))
    .pipe(source(paths.bundleFileName + ".bundled.js"))
    .pipe(gulp.dest(paths.bundleDir))
    .pipe(rename(paths.bundleFileName + ".bundled.min.js"))
    .pipe(buffer())
    .pipe(
      sourcemaps.init({
        loadMaps: true,
        debug: true
      })
    )
    .pipe(
      uglify({
        compress: {
          //disable the compressions. Otherwise, breakpoints in minified files don't work (sourcemaped lines get offset w.r.t. original)
          //minified files does increase from 457 to 459 kb, but can live with that
          negate_iife: false,
          sequences: false
        }
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.bundleDir));
});

/**
 * Faster, because we don't minify, and include source maps in js file (notice we store it with .min.js extension, so we don't have to change the index.html file for debugging)
 */
gulp.task("browserifyForDebug", function() {
  var bundler = browserify({ entries: ["./src/entry.js"], standalone: "YASR", debug: true });

  return bundler
    .bundle()
    .on(
      "error",
      notify.onError(function(error) {
        return error.message;
      })
    )
    .pipe(source(paths.bundleFileName + ".bundled.min.js"))
    .pipe(embedlr())
    .pipe(gulp.dest(paths.bundleDir))
    .pipe(connect.reload());
});
