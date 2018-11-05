/*
 * @Author: zjy 
 * @Date: 2018-11-05 08:51:52 
 * @Last Modified by: zjy
 * @Last Modified time: 2018-11-05 09:31:45
 */

var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
gulp.task("source", function() {
    return gulp.src("src/scss/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
})
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            // open: true,
            middleware: function(req, res, next) {
                var pathname = require("url").parse(req.url, true).pathname;
                if (pathname === "/favicon.ico") {
                    return res.end();
                }
                if (pathname === "") {
                    // 接口
                } else {
                    // 静态资源
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("watch", function() {
    return gulp.watch("src/scss/index.scss", gulp.series("source"))
})
gulp.task("dev", gulp.series("server", "watch"))