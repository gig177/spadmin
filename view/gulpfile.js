var gulp = require('gulp'),
    watchWrapper = require('gulp-watch-wrapper'),
    mergeStream = require('merge-stream');

var installTask = require('gulp-task-install');
    lesscTask = require('gulp-task-lessc'),

gulp.task('i', installTask);

var lessMap = [
    {'less/foo/bar.less' : ['less/foo/*.less']},
    {'less/init.less'    : ['less/*.less', 'less/foo/*.less']}
];
gulp.task('less', function() {
    watchWrapper(lessMap, lesscTask);
});
gulp.task('lessc', function() {
    var merged = mergeStream();
    lessMap.forEach(function(item) {
        for (var target in item);
        merged.add( lesscTask(target) );
    });
    return merged;
});
