const gulp    = require('gulp')
//const htmlmin = require('gulp-htmlmin');
//const uglify = require('gulp-uglify')`
const ghpages = require('gh-pages')

gulp.task('html', function () {
    return gulp.src('source/frontend/*.html')
//        .pipe(htmlmin({ 
//            collapseWhitespace : true,
//            ignorePath         : 'assets' 
//        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
    return gulp.src('source/frontend/css/*.css')
        .pipe(gulp.dest('dist/css'))
})

gulp.task('deploy', function () {
    return ghpages.publish('dist', { add: true }, () => console.log('gh pages'))
})

gulp.task('default', gulp.series('html', 'css'))


