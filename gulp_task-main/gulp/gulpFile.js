const gulp = require('gulp');
const { src, dest, parallel, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imgemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const terser = require('gulp-terser')
var globs = {
    html: "project/*.html",
    css: "project/css/**/*.css",
    img: 'project/pics/*',
    js: 'project/js/**/*.js'
}

function htmiMinify() {
    return src(globs.html)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}
// exports.html = htmiMinify

function cssMinify() {
    return src(globs.css)
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
// exports.css = cssMinify

function jsMinify() {    
    return src(globs.js,{sourcemaps:true})
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('dist/assets/js'),{sourcemaps:'.'})
}
// exports.js = jsMinify

function imgMinify() {
    return gulp.src(globs.img)
        .pipe(imgemin())
        .pipe(gulp.dest('dist/images'));
}
// exports.img = imgMinify

exports.default = series(imgMinify, cssMinify, jsMinify, htmiMinify);