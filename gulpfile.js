/**
 * Created by Lee on 25.11.2016.
 */
var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('connect', function() {
    connect.server({
        root:'',
        livereload:true
    });

});

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/style.scss') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/sass')) // Выгружаем результата в папку app/css
        .pipe(connect.reload());
});

gulp.task('sass-watch', function() {
    return gulp.src('app/sass/style.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('css/')); // Выгружаем в папку app/css
});

gulp.task('html', function () {
    gulp.src('html/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('js/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('app/sass/style.css', ['sass']);
    gulp.watch('html/*.html', ['html']);
    gulp.watch('js/**/*.js', ['js']);
});


gulp.task('default', ['watch', 'sass-watch', 'connect', 'sass', 'js', 'html']);


