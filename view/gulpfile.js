var gulp = require('gulp');

var install = require('gulp-task-install');
    less = require('gulp-task-less'),

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
