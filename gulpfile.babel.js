import {src, dest, watch, series} from 'gulp'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import notify from 'gulp-notify'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import concat from 'gulp-concat'

const paths = {
  templates: {
    src: 'src/*.pug',
    dest: 'app/'
  },
  styles: {
    src: 'src/sass/**/*.sass',
    dest: 'app/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'app/js/'
  }
}

export function server () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
  watch(paths.templates.src, templates)
  watch(paths.styles.src, styles)
  watch(paths.scripts.src, scripts)
}

export function templates () {
  return src(paths.templates.src)
    .pipe(pug({}))
    .pipe(dest(paths.templates.dest))
    .pipe(browserSync.stream())
}

export function styles () {
  return src(paths.styles.src)
    .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(cleanCss())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

export function scripts () {
  return src(paths.scripts.src, {sourcemaps: true})
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('master.min.js'))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

const build = series(scripts, styles, templates, server)

export default build
