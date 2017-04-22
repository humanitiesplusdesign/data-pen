var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sort = require('sort-stream');
var wiredep = require('wiredep').stream;

gulp.task('wire:styles', function() {
  return gulp.src("app/styles/main.styl")
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
    .pipe($.inject(
      gulp.src(["app/components/**/*.styl","app/styles/*.styl","!app/styles/main.styl"], {read:false})
      .pipe(sort(function (a, b) { if (a < b) return -1; if (a > b) return 1; return 0;})), {
          starttag: "// inject:styles",
          endtag: "// endinject",
          addRootSlash: false,
          ignorePath: 'app/',
          transform: function(filepath) {
            return '@import \'../'+filepath.replace(/\.styl$/g,'\.css')+'\'';
          }
        }))
    .pipe(gulp.dest("app/styles"));
});

gulp.task('wire:workerscripts-to-scripts', function() {
  return gulp.src("app/components/app/app-configuration-ui.ts")
    .pipe($.inject(gulp.src("worker.conf"), {
          starttag: "importScripts: [",
          endtag: "]",
          addRootSlash: false,
          ignorePath: 'app/',
          transform: function(filepath, file) {
            return file.contents.toString('utf8').replace(/^/,'\'').replace(/[\n\r]+/g,'\',\n      \'').replace(/,[\n\r]+      '$/,'');
          }
        }))
    .pipe(gulp.dest("app/components/app"));
});

gulp.task('wire:scripts-to-templates', function() {
  return gulp.src("app/*.pug")
    .pipe(wiredep({
      directory: "app/bower_components"
    }))
    // .pipe($.inject(
    //   gulp.src(["app/components/**/*.ts","!app/components/app/app-configuration-ui.ts","!app/components/app/app-configuration-worker.ts"], {read:false})
    //   .pipe(sort(function (a, b) { if (a.path < b.path) return -1; if (a.path > b.path) return 1; return 0;})), {
    //       starttag: "// inject:scripts",
    //       endtag: "// endinject",
    //       addRootSlash: false,
    //       ignorePath: 'app/',
    //       transform: function(filepath) {
    //         return 'script(src="'+filepath.replace(/\.ts$/g,'\.js')+'")';
    //       }
    //     }))
    .pipe(gulp.dest("app"));
});

gulp.task('wire', ['wire:styles', 'wire:workerscripts-to-scripts', 'wire:scripts-to-templates']);
