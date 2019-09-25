var gulp = require('gulp');
var concat = require('gulp-concat');


/*gulp.task('pack-css', function () {
	return gulp.src(['assets/css/main.css', 'assets/css/custom.css'])
		.pipe(concat('stylesheet.css'))
		.pipe(gulp.dest('public/build/css'));
});*/

gulp.task('default', function () {
	return gulp.src(['src/js/gameManager.js', 'src/js/*.js'])
		.pipe(concat('game15.js'))
		.pipe(gulp.dest('dist/js'));
});