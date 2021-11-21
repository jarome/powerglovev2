var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
var minify = require('gulp-cssnano');
var connect = require('gulp-connect');
var browsersync = require("browser-sync").create();
var plumber = require("gulp-plumber");
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');


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

// Clean dist
function clean() {
    return del(["dist"]);
}

// CSS task
function css() {
    return gulp
        .src("scss/**/*")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(minify({
            discardComments: {
              removeAll: true
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browsersync.stream());
}

// JS
function js() {
    return gulp
        .src(["js/**/*"])
        .pipe(plumber())
        .pipe(concat('site.js'))
        .pipe(gulp.dest("dist/js"))
        // folder only, filename is specified in webpack config
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/js"))
        .pipe(browsersync.stream());
}

function images() {
  return gulp
    .src('images/**/*', { sourcemaps: true })
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images/'), { sourcemaps: true })
}

// CSS task
function copyHtml() {
    return gulp
        .src("index.html")
        .pipe(gulp.dest("dist"))
}

// Watch files
function watchFiles() {
    gulp.watch("scss/**/*", css);
    gulp.watch("js/**/*", js);
    gulp.watch("images/**/*", images);
    gulp.watch("index.html", copyHtml);

    // Tasks
    gulp.task("css", css);
    gulp.task("clean", clean);
}


gulp.task(
    "build",
    gulp.series(clean, gulp.parallel(css, copyHtml, images, js))
);

// watch
gulp.task("watch", gulp.parallel(watchFiles));