var gulp = require('gulp');
var gm = require('gulp-gm');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');

gulp.task('jpgcompress', function() {
  return gulp.src('views/images/**.jpg')
      .pipe(imageResize({
        width: 100,
        imageMagick: true
      }))
      .pipe(gm(function(gmfile) { return gmfile; }, { imageMagick: true }))
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest('views/dist/images'));
});

gulp.task('default', ['jpgcompress']);