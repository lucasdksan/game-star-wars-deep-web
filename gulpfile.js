const { src, dest, watch, parallel, series } = require('gulp');
const rename = require('gulp-rename');
const minifyJs = require('gulp-uglify');
const minifyTs = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');

function server(){
    watch(['src/scripts/*.ts'], function(cb){
        javaScriptFiles();
        cb();
    });
    watch(['src/styles/*.scss'], function(cb){
        cssFiles();
        cb();
    });
    watch(['src/templates/*.html'], function(cb){
        htmlFiles();
        cb();
    });
    watch(['src/images/*'], function(cb){
        imageFiles();
        cb();
    });

    return src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
          }));
}

function imageFiles() {
   return src('src/images/*')
    .pipe(dest('dist/assets/images/'));
}

function htmlFiles() {
    return src('src/templates/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
}

function javaScriptFiles() {
    return src('src/scripts/*.ts')
        .pipe(minifyTs({
            noImplicitAny: true
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minifyJs())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/assets/js/'));
}

function cssFiles() {
    return src('src/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist/assets/css/'));
}

exports.default = series(server, parallel(imageFiles, htmlFiles, javaScriptFiles, cssFiles));