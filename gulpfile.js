var gulp = require('gulp');
var del = require('del');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', function (callback) {
  del('build/**', callback);
});

var appFileStream;
gulp.task('app', function (callback) {
  appFileStream = gulp
    .src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
  callback();
});

gulp.task('styles', function () {

});

var vendorFilesStream;
gulp.task('vendor', function (callback) {
  var vendorFiles = bowerFiles();

  vendorFilesStream = gulp
    .src(vendorFiles)
    .pipe(gulp.dest('build/vendor'));
  callback();
});

gulp.task('index', ['app', 'styles', 'vendor'], function () {
  return gulp
    .src(['app/index.html'])
    // write here first for correct relative injection path
    .pipe(gulp.dest('build'))
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
  gulp.watch(['app/**/*.js'], ['app']);
  gulp.watch(['app/index.html'], ['index']);

  gulp.watch(['build/**'], reload);
});
