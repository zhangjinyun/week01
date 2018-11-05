/*
 * @Author: zjy 
 * @Date: 2018-11-05 08:51:52 
 * @Last Modified by: zjy
 * @Last Modified time: 2018-11-05 09:50:32
 */
// 下载并引入
var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
// 编译scss
gulp.task("source", function() {
    return gulp.src("src/scss/index.scss")
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest("src/css"))
})

// 压缩js
gulp.task("uglify", function() {
    return gulp.src("src/js/index.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
})

// 起服务
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

// 监听
gulp.task("watch", function() {
    return gulp.watch("src/scss/index.scss", gulp.series("source"))
})
gulp.task("dev", gulp.series("server", "watch"))