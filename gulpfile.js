'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');
var os = require('os');

// Config
var config = {
    header: '/*!\n * jQuery Korean Pronunciation Conversion Library <%= version %>\n * https://github.com/kawoou/jquery-korean-pron\n *\n * Copyright 2019 <%= pkg.author.name %>\n * Released under the MIT license\n */',
    main: pkg.main,
    src: './src',
    dist: './dist'
};

// Pipes
var pipes = {};

pipes.validateFiles = function (files) {
    return gulp.src(files, { base: config.src })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
};

pipes.validate = function () {
    return pipes.validateFiles(config.main);
};

pipes.build = function () {
    return pipes.validateFiles(config.main)
        .pipe(header(config.header + os.EOL, {
            pkg: pkg,
            version: 'v' + pkg.version
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(uglify())
        .pipe(header(config.header + os.EOL, {
            pkg: pkg,
            version: 'v' + pkg.version
        }))
        .pipe(rename(function (path) {
            path.extname = '.min' + path.extname;
        }))
        .pipe(gulp.dest(config.dist));
};

// Tasks
gulp.task('validate', pipes.validate);
gulp.task('build', pipes.build);
gulp.task('watch', function () {
    gulp.watch(config.main, pipes.build);
});
