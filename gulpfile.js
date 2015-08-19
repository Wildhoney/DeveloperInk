(function($gulp) {

    var sass = require('gulp-sass');

    $gulp.task('sass', function() {

        return $gulp.src('templates/.current/sass/default.scss')
                    .pipe(sass().on('error', sass.logError))
                    .pipe($gulp.dest('.devink/build'));

    });

    $gulp.task('watch', function() {

        var sassFiles = [
            'templates/.current/sass/*.scss',
            'templates/.current/sass/**/*.scss',
            'templates/.current/sass/**/**/*.scss'
        ];

        $gulp.watch(sassFiles, ['sass']);

    });

})(require('gulp'));