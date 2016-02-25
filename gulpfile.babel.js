import flow from 'flow-bin';
import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import { paths } from './gulp.config';

gulp.task('default', callback => {
  run('server', 'build', 'watch', callback);
});

gulp.task('build', callback => {
  run('clean:app', 'clean:server', 'clean:styles', 'flow', 'babel', 'styles', 'restart', callback);
});

gulp.task('clean:app', callback => {
  rimraf(paths.destination, callback);
});

gulp.task('clean:server', callback => {
  rimraf(paths.destinationServer , callback);
});

gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

gulp.task('babel', shell.task([
  `babel ${paths.source}/js --out-dir app/js`,
  `babel ${paths.source}/server --out-dir .`
]));

////css stuff
gulp.task('styles', () => {
  return gulp
      .src(paths.less)
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%']}))
      .pipe(gulp.dest(paths.temp));
});

gulp.task('clean:styles', callback => {
    rimraf(paths.temp, callback);
});
////

let express;

gulp.task('server', () => {
    express = server.new(paths.destinationServer);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.toWatch, () => {
    gulp.start('build');
  });
});
