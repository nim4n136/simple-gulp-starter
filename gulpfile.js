var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['serve']);

gulp.task('compile:sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  gulp.src('src/js/*.js')
  .pipe(gulp.dest('dist/js/'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest('dist/js/'))
  .pipe(browserSync.stream());
});

gulp.task('compile', ['compile:sass','js']);

gulp.task('serve', ['compile'], function () {
  browserSync.init({ server: '.' });
  gulp.watch('src/scss/**/*.scss', ['compile:sass']);
  gulp.watch('src/js/**/*.js', ['js']);
});