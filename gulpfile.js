/*
 * @Author: zjy 
 * @Date: 2018-11-05 08:51:52 
 * @Last Modified by: zjy
 * @Last Modified time: 2018-11-05 09:01:14
 */

var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
gulp.task("source", function() {
    return gulp.src("src/scss/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
})

gulp.task("watch", function() {
    return gulp.watch("src/scss/index.scss", gulp.series("source"))
})
gulp.task("dev", gulp.series("watch"))