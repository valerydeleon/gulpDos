var gulp = require('gulp');
var uglify =  require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');

var config = {
  source: './src',
  dist: "./public/"
}

var paths = {
  assets: "/assets/",
  html: "./src/*.html",
  js: "js/*.js",
  sass: "scss/**/*.scss",
  mainSass: "scss/main.scss",
  mainJs: "js/app.js"
}

var sources = {
  assets: config.source + paths.asstes,
  html: paths.html,

  sass: paths.asstes + paths.sass,
  rootSass: config.source + paths.assets + paths.mainSass,

  js: config.source + paths.js,
  rootJs: config.source + paths.assets + paths.mainJs
}

gulp.task('html', function(){
  gulp.src(sources.html)
  .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function(){
  // console.log(sources.rootSass);
  // console.log(config.dist + "css");
  gulp.src(sources.rootSass)
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on("error", sass.logError))
  .pipe(gulp.dest(config.dist + "css"))
});

gulp.task('js', function(){
  gulp.src(sources.rootJs)
  .pipe(obfuscate())
  .pipe(gulp.dest(config.dist + "/js"));
});

//
// gulp.task('getJS', function(){
//   gulp.src(paths.js)
//   .pipe(uglify())
//   .pipe(obfuscate())
//   .pipe(gulp.dest('public'))
// });
//
// gulp.task('getHTML', function(){
//   gulp.src(paths.scss)
//   .pipe(sass({outputStyle: 'compressed'})
//     .on('error', sass.logError)) //parte del pipe anterior y puede tener error y se logue con el error
//   .pipe(gulp.dest('public'))
// });
