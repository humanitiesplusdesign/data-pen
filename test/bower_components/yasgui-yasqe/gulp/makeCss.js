var gulp = require('gulp'),
	concat = require('gulp-concat'),
	paths = require('./paths.js'),
	connect = require('gulp-connect'),
	sourcemaps = require('gulp-sourcemaps');
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require("gulp-rename"),
	notify = require('gulp-notify'),
	minifyCSS = require('gulp-cssnano');


gulp.task('makeCss', function() {
	  return gulp.src(paths.style)
	    .pipe(sass())
	    .on("error", notify.onError(function(error) {
	    	return error.message;
	    }))
			.pipe(autoprefixer({
          browsers: ['> 5%']
      }))
	    .pipe(concat(paths.bundleFileName + '.css'))
	    .pipe(gulp.dest(paths.bundleDir))
	    .pipe(minifyCSS({
			//the minifyer does not work well with lines including a comment. e.g.
			///* some comment */ }
			//is completely removed (including the final bracket)
			//So, disable the 'advantaced' feature. This only makes the minified file 100 bytes larger
			noAdvanced: true,
		}))
	    .pipe(rename(paths.bundleFileName + '.min.css'))
	    .pipe(gulp.dest(paths.bundleDir))
	    .pipe(connect.reload());
})

var cssDeps = [
	"./node_modules/codemirror/lib/codemirror.css",
	"./node_modules/codemirror/addon/display/fullscreen.css",
	"./node_modules/codemirror/addon/fold/foldgutter.css",
	"./node_modules/codemirror/addon/hint/show-hint.css"
]
gulp.task('copyCssDeps', function() {
	  return gulp.src(cssDeps)
			.pipe(rename({
				prefix: "_",
				extname: '.scss'
			}))
	    .pipe(gulp.dest('./src/scss/cssIncludes'))
})
