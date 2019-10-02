var gulp = require('gulp');
var concat = require('gulp-concat');


gulp.task('pack-css', function () {
	return gulp.src(['src/css/*.css'])
		.pipe(concat('game15.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('pack-js', function () {
	return gulp.src(['src/js/gameManager.js', 'src/js/*.js'])
		.pipe(concat('game15.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.parallel('pack-css','pack-js'));