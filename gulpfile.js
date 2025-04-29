const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Minify HTML
function minifyHTML() {
    return gulp.src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

// Minify CSS
function minifyCSS() {
    return gulp.src('styles.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
}

// Minify JS
function minifyJS() {
    return gulp.src('script.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
}

// Optimize Images
function optimizeImages() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

// Default Task
exports.default = gulp.series(
    gulp.parallel(minifyHTML, minifyCSS, minifyJS, optimizeImages)
);
