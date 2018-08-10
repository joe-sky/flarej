import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import template from 'gulp-template';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import less from 'gulp-less';
import cssnano from 'gulp-cssnano';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import { argv } from 'yargs';
import glob from 'glob';
import env from 'gulp-env';

function getJsLibName() {
  let libName = 'flarej.js';
  if (argv.p) {
    libName = 'flarej.min.js';
  }

  return libName;
}

function getCssLibName() {
  let libName = 'flarej.css';
  if (argv.p) {
    libName = 'flarej.min.css';
  }

  return libName;
}

function getThemeLibName(themeName) {
  let libName = 'flarej.theme.' + themeName + '.css';
  if (argv.p) {
    libName = 'flarej.theme.' + themeName + '.min.css';
  }

  return libName;
}

//The packages need to be excluded by webpack
const webpackExternals = {
  'nornj': {
    root: 'nj',
    commonjs2: 'nornj',
    commonjs: 'nornj',
    amd: 'nornj'
  },
  'nornj-react': {
    root: 'njr',
    commonjs2: 'nornj-react',
    commonjs: 'nornj-react',
    amd: 'nornj-react'
  },
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  }
};

//Handle error
function handleError() {
  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, arguments);

  // Keep gulp from hanging on this task
  this.emit('end');
}

function concatBabelHelpers(jsLibName) {
  gulp.src(['./vendor/babelHelpers.min.js', './dist/js/' + jsLibName])
    .pipe(gulpif(argv.p, sourcemaps.init({ loadMaps: true })))
    .pipe(concat(jsLibName))
    .pipe(gulpif(argv.p, sourcemaps.write('./')))
    .pipe(gulp.dest('./dist/js'));
}

gulp.task('build-js', () => {
  let jsLibName = getJsLibName(),
    plugins = [
      new webpack.NoEmitOnErrorsPlugin()
    ],
    lastHash = null;

  if (argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: false,
        warnings: false
      },
      sourceMap: true
    }));
  }

  return gulp.src('./src/base.js')
    .pipe(env.set({
      BABEL_ENV: 'webpack'
    }))
    .pipe(webpackStream({
      devtool: argv.p ? 'source-map' : false,
      watch: argv.w ? true : false,
      externals: webpackExternals,
      output: {
        filename: jsLibName,
        library: 'FlareJ',
        libraryTarget: 'umd'
      },
      module: {
        rules: [{
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: ['external-helpers']
            }
          }],
          exclude: /node_modules/
        }, {
          test: /\.t.html(\?[\s\S]+)*$/,
          use: [{
            loader: 'nornj-loader',
            options: {
              outputH: true,
              delimiters: 'react'
            }
          }]
        }]
      },
      plugins
    }, webpack, (err, stats) => {
      if (argv.w && stats.hash != lastHash) {
        lastHash = stats.hash;
        concatBabelHelpers(jsLibName);
      }

      console.log(stats.toString({
        chunks: false,
        colors: true,
        //hash: false
      }));
    }))
    .on('error', handleError)
    .pipe(gulp.dest('./dist/js').on('end', () => {
      if (!argv.w) {
        concatBabelHelpers(jsLibName);
      }
    }));
});

gulp.task('build-css', () => {
  let cssLibName = getCssLibName();

  return gulp.src('./src/styles/index-all.less')
    .pipe(gulpif(argv.p, sourcemaps.init()))
    .pipe(less())
    .pipe(gulpif(argv.p, cssnano()))
    .pipe(postcss([autoprefixer({ browsers: ['last 50 versions'] })]))
    .pipe(rename(cssLibName))
    .pipe(gulpif(argv.p, sourcemaps.write('./', { sourceRoot: '' })))
    .pipe(gulp.dest('./dist/css'));
});

//Build theme css
gulp.task('build-theme', () => {
  glob('./src/styles/theme/**/index-all.less', {}, (err, files) => {
    files.forEach((file) => {
      let filePath = file.substring(0, file.lastIndexOf("/")),
        themeName = filePath.substr(filePath.lastIndexOf("/") + 1),
        themeLibName = getThemeLibName(themeName);

      gulp.src(file)
        .pipe(gulpif(argv.p, sourcemaps.init()))
        .pipe(less())
        .pipe(gulpif(argv.p, cssnano()))
        .pipe(postcss([autoprefixer({ browsers: ['last 50 versions'] })]))
        .pipe(rename(themeLibName))
        .pipe(gulpif(argv.p, sourcemaps.write('./', { sourceRoot: themeName })))
        .pipe(gulp.dest('./dist/css/theme'));
    });
  });
});

gulp.task('build-all-css', ['build-css', 'build-theme']);

//Monitor changes of LESS files
gulp.task("watch-css", () => {
  gulp.watch('./src/styles/**/*.less', ['build-css']);
  gulp.start('build-css');
});

gulp.task("watch-theme", () => {
  gulp.watch('./src/styles/theme/**/*.less', ['build-theme']);
  gulp.start('build-theme');
});

gulp.task('build', ['build-js', 'build-all-css']);

//Convert es6 code to es5 from src to lib
gulp.task("lib", () => {
  //Copy style files
  gulp.src('./src/styles/**/*.less')
    .pipe(gulp.dest('./lib/styles'));

  //Convert js files
  return gulp.src('./src/**/*.js')
    .pipe(env.set({
      BABEL_ENV: 'precompile'
    }))
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
});

// gulp.task("lib", () => {
//   //Copy style files
//   gulp.src('./src/styles/**/*.less')
//     .pipe(gulp.dest('./lib/styles'));

//   //Copy html files
//   gulp.src('./src/**/*.html')
//     .pipe(gulp.dest('./lib'));

//   //Convert js files
//   return gulp.src('./src/**/*.js')
//     .pipe(env.set({
//       BABEL_ENV: 'development'
//     }))
//     .pipe(babel())
//     .pipe(gulp.dest('./lib'));
// });

//Default task
let defaultTasks = ['build-js'];
if (argv.w) {
  defaultTasks.push('watch-css', 'watch-theme');
} else {
  defaultTasks.push('build-all-css');
}
gulp.task('default', defaultTasks);