/*
 * html
 */
import fs from 'fs'
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import size from 'gulp-size'
import rename from 'gulp-rename'
import pug from 'gulp-pug'
import data from 'gulp-data'
import config from '../config'
const version = require('../version.json')
const timestump = '20180419000000'


// pug
gulp.task('pug', () => {
  console.log('---------- html ----------')
  const gulpTask = gulp.src(
      [
        config.directory.html_src + 'html/**/*.pug',
        '!' + config.directory.html_src + 'html/include/**/*.pug',
      ],
    )
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    }))
    .pipe(data(() => {
      const gulpData = {
        config: JSON.parse(fs.readFileSync(`./${config.directory.html_src}data/common/config.json`, 'utf8')),
        nav: JSON.parse(fs.readFileSync(`./${config.directory.html_src}data/common/nav.json`, 'utf8')),
        sample: JSON.parse(fs.readFileSync(`./${config.directory.html_src}data/module/sample.json`, 'utf8')),
        version,
        timestump,
        pathStat: config.pathStat.local,
      }
      return gulpData
    }))
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    }))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(config.directory.dist + '/'))
    .pipe(size({ title: 'size : html' }))
  return gulpTask
})
