var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var browsersync = require("browser-sync").create();
var plumber = require("gulp-plumber");


var htmlSources = ['**/*.html'];

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(["assets"]);
}

// CSS task
function css() {
    return gulp
        .src("scss/**/*")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browsersync.stream());
}

// JS
function js() {
    return gulp
        .src(["js/**/*"])
        .pipe(plumber())
        // folder only, filename is specified in webpack config
        .pipe(gulp.dest("assets/js"))
        .pipe(browsersync.stream());
}

// CSS task
function copyHtml() {
    return gulp
        .src("index.html")
        .pipe(gulp.dest("assets"))
}

// Watch files
function watchFiles() {
    gulp.watch("scss/**/*", css);
    gulp.watch("js/**/*", js);
    gulp.watch("index.html", copyHtml);

    // Tasks
    gulp.task("css", css);
    gulp.task("clean", clean);
}


gulp.task(
    "build",
    gulp.series(clean, gulp.parallel(css, copyHtml, js))
);

// watch
gulp.task("watch", gulp.parallel(watchFiles));