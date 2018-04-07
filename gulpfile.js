var gulp = require('gulp'),
    sass = require('gulp-sass'),
    spawn = require('child_process').spawn,
    livereload = require('gulp-livereload');

// Compile SASS
gulp.task('sass', function () {
    	gulp.src('assets/_sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Run Jekyll Build Asynchronously
gulp.task('jekyll', function () {
    var jekyll = spawn('jekyll', ['build']);

    jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --')
    })
});


// Watch for changes
gulp.task('watch', function () {
    livereload.listen();

    // Manually compile and inject css to avoid jekyll overhead, and utilize livereload injection
    gulp.watch('assets/_sass/*.sass', ['sass']);
    
    // Watch for changes to other files for jekyll compilation
    // Note: This will probably need to be updated with the files you want to watch
    // Second Note: MAKE SURE that the last two items in the watchlist are included or else infinite jekyll loop
    gulp.watch(['*.html', '*/*.html', '*/*.md', '*/_posts/*.markdown', '!_site/**', '!_site/*/**'], ['jekyll']);
});


gulp.task('default', ['sass', 'jekyll', 'watch']);


