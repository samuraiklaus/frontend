import gulp from 'gulp'
import browserSync from 'browser-sync'

export function server () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
}

const build = server

export default build
