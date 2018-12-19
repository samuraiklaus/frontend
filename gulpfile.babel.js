import {src, dest, watch, series} from 'gulp'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'

const paths = {
  templates: {
    src: 'src/*.pug',
    dest: 'app/'
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
}

export function templates () {
  return src(paths.templates.src)
    .pipe(pug({}))
    .pipe(dest(paths.templates.dest))
    .pipe(browserSync.stream())
}


const build = series(templates, server)

export default build
