import browserSync from 'browser-sync';
import flow from 'flow-bin';
import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import ls from 'gulp-live-server';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import { argv } from 'yargs';
import { paths, config } from './gulp.config';

const port = process.env.PORT || config.defaultPort;

gulp.task('default', callback => {
  run('server', 'build', 'watch', callback);
});

gulp.task('build', callback => {
  run('clean-app', 'clean-server', 'flow', 'static', 'babel', 'styles', 'restart', callback);
});

gulp.task('clean-app', callback => {
  rimraf(paths.destination, callback);
});

gulp.task('clean-server', callback => {
  rimraf(paths.nodeServer, callback);
});

gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

gulp.task('babel', shell.task([
  `babel ${paths.source}/js --out-dir ${paths.bundle}`,
  `babel ${paths.server} --out-dir .`
]));

gulp.task('static', () => {
  return gulp
      .src([`${paths.source}/public/**/*`])
      .pipe(gulp.dest(paths.public));
});

////css stuff
gulp.task('styles', () => {
  return gulp
      .src(paths.less)
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%']}))
      .pipe(gulp.dest(paths.css));
});
////

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

  console.log(`*** Starting browser-sync on port ${port}`);

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
