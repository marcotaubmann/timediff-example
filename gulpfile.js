var gulp = require('gulp');
var del = require('del');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var at = require('gulp-asset-transform');
var gulpFilter = require('gulp-filter');
var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sizereport = require('gulp-sizereport');
var karma = require('karma').server;

gulp.task('clean', function (callback) {
  del([
    'build/**',
    'dist/**'
  ], callback);
});

var appFileStream;
gulp.task('scripts', function (callback) {
  appFileStream = gulp
    .src(['app/**/*.js', '!app/**/*spec.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
  callback();
});

var styleFileStream;
gulp.task('styles', function (callback) {
  styleFileStream = gulp
    .src('app/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'));
  callback();
});

var vendorFilesStream;
gulp.task('vendor', function (callback) {
  var vendorFiles = bowerFiles();

  vendorFilesStream = gulp
    .src(vendorFiles)
    .pipe(gulp.dest('build/vendor'));
  callback();
});

gulp.task('index', ['scripts', 'styles', 'vendor'], function () {
  return gulp
    .src(['app/index.html'])
    // write here first for correct relative injection path
    .pipe(gulp.dest('build'))
    .pipe(inject(styleFileStream, {name: 'style', relative: true}))
    .pipe(inject(appFileStream, {name: 'app', relative: true}))
    .pipe(inject(vendorFilesStream, {name: 'vendor', relative: true}))
    // write here again with injected files
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['index'], function () {
  return gulp
    .src('')
    .pipe(notify({message: 'build complete'}));
});

gulp.task('serve', ['build'], function (callback) {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
  return callback();
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(['app/**/*.js', '!app/**/*spec.js'], ['scripts']);
  gulp.watch(['app/**/*.css'], ['styles']);
  gulp.watch(['bower.json'], ['index']);
  gulp.watch(['app/index.html'], ['index']);

  gulp.watch(['build/**'], reload);
});

gulp.task('dist', ['build'], function () {
  var htmlFilter = gulpFilter ('*.html');
  return gulp
    .src(['build/index.html'])
    .pipe(at({
      css: { stream: function (filestream, outputFilename)  {
        return filestream
          .pipe(minifyCss())
          .pipe(concat(outputFilename));
      }},
      js: { stream: function (filestream, outputFilename)  {
        return filestream
          .pipe(uglify())
          .pipe(concat(outputFilename));
      }}
    }))
    .pipe(htmlFilter)
    .pipe(minifyHtml())
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'))
    .pipe(sizereport({gzip: true}));
});

gulp.task('test', function (callback) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, callback);
});

gulp.task('tdd', function (callback) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
  }, callback);
});
