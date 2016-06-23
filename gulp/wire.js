var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

gulp.task('wire:styles', function() {
  return gulp.src("app/styles/*.styl")
    .pipe(wiredep({
      directory: "app/bower_components",
      fileTypes: {
        styl: {
          block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
          detect: {
            css: /@import\s['"](.+)['"]/gi,
            styl: /(@import|@require)\s['"](.+)['"]/gi
          },
          replace: {
            css: '@import "{{filePath}}"',
            styl: '@require "{{filePath}}"'
          }
        }
      }
    }))
    .pipe(gulp.dest("app/styles"));
});

gulp.task('wire:workerscripts-to-scripts', function() {
  return gulp.src("app/scripts/app.ts")
    .pipe($.inject(gulp.src("worker.conf"), {
          starttag: "importScripts: [",
          endtag: "]",
          addRootSlash: false,
          ignorePath: 'app/',
          transform: function(filepath, file) {
            return file.contents.toString('utf8').replace(/^/,'\'').replace(/\n/g,'\',\n      \'').replace(/,\n      '$/,'')
          }
        }))
    .pipe(gulp.dest("app/scripts"));
});

gulp.task('wire:scripts-to-templates', function() {
  return gulp.src("app/*.pug")
    .pipe(wiredep({
      directory: "app/bower_components"
    }))
    .pipe($.inject(gulp.src(["app/scripts/**/*.ts","!app/scripts/app.ts","!app/scripts/worker-app.ts"], {read:false}), {
          starttag: "// inject:scripts",
          endtag: "// endinject",
          addRootSlash: false,
          ignorePath: 'app/',
          transform: function(filepath) {
            return 'script(src="'+filepath.replace(/\.ts$/g,'\.js')+'")'
          }
        }))
    .pipe(gulp.dest("app"));
});

gulp.task('wire', ['wire:styles', 'wire:workerscripts-to-scripts', 'wire:scripts-to-templates'])
