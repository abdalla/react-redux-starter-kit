import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';


const paths = {
  js: ['./src/**/*.js'],
  destination: './app'
};

gulp.task('default', callback => {
  run('server', 'build', 'watch', callback);
});

gulp.task('build', callback => {
  run('clean', 'flow', 'babel', 'restart', callback);
});

gulp.task('clean', callback => {
  rimraf(paths.destination, callback);
});

gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));

let express;

gulp.task('server', () => {
    express = server.new(paths.destination + '/server.js' );
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.js, () => {
    gulp.start('build');
  });
});
