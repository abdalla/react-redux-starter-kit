import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';


const paths = {
  js: ['./src/**/*.js'],
  source: 'src',
  destination: './app',
  destinationServer: './server.js'
};

gulp.task('default', callback => {
  run('server', 'build', 'watch', callback);
});

gulp.task('build', callback => {
  //run('clean:app', 'clean:server', 'flow', 'babel', 'compress', 'restart', callback);
  run('clean:app', 'clean:server', 'flow', 'babel', 'restart', callback);
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

//gulp.task('compress', ['babel'], () => {
//  return gulp
//      .src('./app/**/*.js')
//      .pipe(concat('bundle.js'))
//      .pipe(uglify())
//      .pipe(gulp.dest('./app/min/'));
//});

gulp.task('babel', shell.task([
  `babel ${paths.source}/js --out-dir app`,
  `babel ${paths.source}/server --out-dir .`
]));

let express;

gulp.task('server', () => {
    express = server.new(paths.destinationServer);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.js, () => {
    gulp.start('build');
  });
});
