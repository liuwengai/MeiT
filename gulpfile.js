var gulp = require('gulp');
var scss = require('gulp-sass'); //编译scss
var auto = require('gulp-autoprefixer'); //自动添加后缀
var server = require('gulp-webserver'); //起服务拦截前端请求
var path = require('path');
var fs = require('fs');
var url = require('url');
var listJson = require('./src/mock/list.json');
var hotlist = require('./src/mock/hotlist.json');
var data = ["刘文改", "刘改改", "张三", "李四", "李白", "李哈哈", "张哈哈", "张三三", "赵哈哈", "赵丽娜"];
var arr = [];
//编译scss
gulp.task('Scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'));
});
gulp.task('dev', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            //host: '10.1.10.175', //配置ip
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = require('url').parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    return res.end();
                }
                // if (pathname == '/') {
                //     res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                // } else
                if (pathname == '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: listJson }));
                } else if (pathname == '/api/hotlist') {
                    res.end(JSON.stringify({ code: 0, data: hotlist }));
                } else if (pathname == '/login') {
                    var val = url.parse(req.url, true).query.val;
                    console.log(val);
                    data.forEach(function(item) {
                        if (item.indexOf(val) != -1) {
                            arr.push(item);
                        }
                    });
                    console.log(arr);
                    res.end(JSON.stringify({ code: 0, datas: arr }));
                } else {
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('Scss'));
});
gulp.task('ddd', gulp.series('dev', 'Scss', 'watch'));