module.exports = (gulp, $) => {
  return () => {
    gulp.src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      './app/scripts/*.js',
      './node_modules/webfontloader/webfontloader.js',
      '!./app/scripts/_init.js'
    ])
      .pipe($.newer('.tmp/scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.plumber())
      .pipe($.babel())
      .pipe($.sourcemaps.write())
      .pipe($.concat('main.js'))
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe($.uglify({preserveComments: 'some'}))
      // Output files
      .pipe($.size({title: 'scripts'}))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts'))
  };
};
