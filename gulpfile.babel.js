import { argv } from 'yargs';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel'
import browserify from 'gulp-browserify';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import csso from 'gulp-csso';
import del from 'del';
import flow from 'flow-bin';
import gulp from 'gulp';
import less from 'gulp-less';
import ls from 'gulp-live-server';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import rev from 'gulp-rev';
import replace from 'gulp-rev-replace';
import rimraf from 'rimraf';
import run from 'run-sequence';
import shell from 'gulp-shell';
import watch from 'gulp-watch';
import uglify from 'gulp-uglify';
import util from 'gulp-util';

//gulp-bump ==> https://www.npmjs.com/package/gulp-bump ==> to increment package version

import { paths, config } from './gulp.config';

const port = process.env.PORT || config.defaultPort;

gulp.task('default', callback => {
  run('server', 'build', 'watch', callback);
});

gulp.task('build', callback => {
  run('clean-app', 'clean-server', 'flow', 'babel-server', 'minify-js', 'minify-css', 'clean-concat-files', 'revision', 'replace', 'clean-temp', 'restart', callback);
});

gulp.task('clean-app', callback => {
  rimraf(paths.destination, callback);
});

gulp.task('clean-server', callback => {
  rimraf(paths.nodeServer, callback);
});

gulp.task('clean-temp', callback => {
  rimraf(paths.temp, callback);
});

gulp.task('clean-concat-files', () => {
  log(paths.concatScript);
  del(paths.concatScript);
});

gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

gulp.task('babel-server', shell.task([
  `babel ${paths.server} --out-dir .`
]));

////css stuff
gulp.task('minify-css', () => {
  return gulp
      .src(paths.less)
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%']}))
      .pipe(csso())
      .pipe(gulp.dest(paths.cssTemp));
});
////

gulp.task('minify-js', () => {
  return gulp
      .src(`${paths.js}**/*.js`)
      .pipe(plumber())
      .pipe(babel())
      .pipe(concat(config.concatScriptName)) //=> only to avoid copies
      .pipe(gulp.dest(paths.bundleTemp))
      .pipe(browserify())
      .pipe(uglify())
      .pipe(rename(config.bundleMinName))
      .pipe(gulp.dest(paths.bundleTemp))
});

gulp.task('revision', () => {
  return gulp
      .src(`${paths.temp}/**/*.*`)
      .pipe(plumber())
      .pipe(rev())
      .pipe(gulp.dest(paths.destination))
      .pipe(rev.manifest())
      .pipe(gulp.dest(paths.destination));
});

gulp.task("replace", () => {
  var manifest = gulp.src(paths.manifest);

  return gulp
    .src([`${paths.allPublicFile}`])
    .pipe(replace({manifest: manifest}))
    .pipe(gulp.dest(`${paths.public}`));
});


let express;

gulp.task('server', () => {
    express = ls(paths.nodeServer, {env: {PORT: port}});
});

gulp.task('restart', () => {
    express.start.bind(express)();

    if(express.config.options.env.NODE_ENV === 'development') {
      startBrowserSync();
    };
});

gulp.task('watch', () => {
  return watch(paths.toWatch, () => {
    gulp.start('build');
  });
});

///browserSync stuff
let startBrowserSync = () => {
  if( argv.nosync || browserSync.active) {
    return;
  };

  log(`*** Starting browser-sync on port ${port}`);

  let options = {
    proxy: `localhost:${port}`,
    port: 3100,
    files: [`${paths.destination}/**/*.*`],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);
};

/////////////////////////////////
let log = (msg) => {
  if(typeof msg === 'object') {
    for (let item in msg) {
      if(msg.hasOwnProperty(item)) {
        util.log(util.colors.red(msg[item]));
      }
    }
  } else {
    util.log(util.colors.red(msg));
  }
};
