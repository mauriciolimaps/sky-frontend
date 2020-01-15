const gulp      = require('gulp')
const htmlmin   = require('gulp-htmlmin')
const uglifycss = require('gulp-uglifycss')
const uglify    = require('gulp-uglify')
const del       = require('del')
const ghpages   = require('gh-pages')

gulp.task('html', function () {
    return gulp.src('source/frontend/*.html')
        .pipe(htmlmin({ 
            collapseWhitespace : true,
            ignorePath         : 'assets' 
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('js', () => {
    return gulp.src('source/frontend/js/*.js')
//        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('css', () => {
    return gulp.src('source/frontend/css/*.css')
        .pipe(uglifycss({
            'maxLineLen'    : 80,
            'uglyComments'  : true
        }))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('backend', () => {
    return gulp.src('source/backend/movies/*')
        .pipe(gulp.dest('dist/backend/movies'))
})

gulp.task('clean', del.bind(null, ['.tmp', 'dist']), () => console.log('Clean done'))

gulp.task('build', gulp.series('html', 'js', 'css', 'backend'))

gulp.task('deploy', function () {
    return ghpages.publish('dist', { add: true }, () => console.log('gh pages'))
})

gulp.task('default', async () => {
    await gulp.series('clean', 'build' )()
    console.log('Done')
})


