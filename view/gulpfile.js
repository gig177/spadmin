var gulp = require('gulp');

var install = require('gulp-task-install');
    less = require('gulp-task-less'),
    swig = require('gulp-task-swig');

gulp.task('i', install);

var lessMap = [
    { 'less/init.less' : 'less/*.less' }
];
gulp.task('less', function() {
    less.watch(lessMap);
});
gulp.task('lessc', function() {
    return less.compile(lessMap);
});

var tplMap = 'js/app/templates/**/*html';
gulp.task('tpl', function() {
    swig.watch(tplMap, { base : 'js' });
});
gulp.task('tplc', function() {
    return swig.compile(tplMap, { base : 'js' });
});
