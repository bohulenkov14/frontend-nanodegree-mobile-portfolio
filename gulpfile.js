var gulp = require('gulp');
var gm = require('gulp-gm');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var inlinesource = require('gulp-inline-source');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');



//=========================================
//Resume site tasks
//=========================================

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('uglify-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('inlinesource', function () {
  return gulp.src('*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('build/'));
});

gulp.task('jpgCompress', function() {
  return gulp.src('img/**.jpg')
    .pipe(gm(function(gmfile) { return gmfile; }, { imageMagick: true }))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('jpgResizeCompress', function() {
  return gulp.src('views/images/**.jpg')
    .pipe(imageResize({
      width: 100,
      imageMagick: true
    }))
    .pipe(gm(function(gmfile) { return gmfile; }, { imageMagick: true }))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('build/views/images'));
});

gulp.task('minify-html', function() {
  return gulp.src('build/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

gulp.task('resume',
  [
    'minify-css',
    'uglify-js',
    'jpgResizeCompress',
    'jpgCompress',
    'inlinesource',
    'minify-html'
  ]
);

//=========================================
//Pizza site tasks
//=========================================

gulp.task('copy-css', function() {
  return gulp.src('views/css/*.css')
    .pipe(gulp.dest('build/views/css'));
});

gulp.task('copy-js', function() {
  return gulp.src('views/js/*.js')
    .pipe(gulp.dest('build/views/js'));
});

gulp.task('copy-html', function () {
  return gulp.src('views/*.html')
    .pipe(gulp.dest('build/views/'));
});

gulp.task('copy-png', function () {
  return gulp.src('views/images/*.png')
    .pipe(gulp.dest('build/views/images'));
});

gulp.task('pizza',
  [
    'copy-css',
    'copy-js',
    'copy-html',
    'copy-png',
  ]
);


gulp.task('default', ['resume', 'pizza']);

gulp.task('deploy', function () {
  return gulp.src("build/**/*")
    .pipe(deploy())
});
