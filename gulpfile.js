'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    exec = require('child_process').exec;

gulp.task('blockly', ['pybuild'], function() {
  return gulp.src('blockly_compressed.js')
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=that;'))
      .pipe(insert.wrap('var DOMParser = require("xmldom").DOMParser; var XMLSerializer = require("xmldom").XMLSerializer; module.exports = (function(){  var that = {}; that.navigator=""; ', ' return Blockly;})()'))
      .pipe(gulp.dest('.'))
});

gulp.task('blocks', ['pybuild'], function() {
  return gulp.src('blocks_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){Blockly.Blocks={};', 'return Blockly.Blocks;}'))
      .pipe(gulp.dest('.'))
});

gulp.task('js', ['pybuild'], function() {
  return gulp.src('javascript_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.JavaScript;}'))
      .pipe(gulp.dest('.'))
});

gulp.task('dart', ['pybuild'], function() {
  return gulp.src('dart_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.Dart;}'))
      .pipe(replace(/window\./g, ''))
      .pipe(gulp.dest('.'))
});

gulp.task('python', ['pybuild'], function() {
  return gulp.src('python_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.Python;}'))
      .pipe(gulp.dest('.'))
});

gulp.task('en', ['pybuild'], function() {
  return gulp.src('msg/js/en.js')
      .pipe(replace(/goog\.[^\n]+/g, ''))
      .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){ ', 'return Blockly.Msg;}'))
      .pipe(gulp.dest('i18n/'))
});

gulp.task('pybuild', function (cb) {
  exec('./build.py', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


gulp.task('build', ['blocks', 'blockly', 'en', 'js', 'dart', 'python']);
gulp.task('default', ['build']);
