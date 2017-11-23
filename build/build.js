require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    const appJsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'app.min.js');
    const appJsNewPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'app.' + stats.hash + '.js');

    fs.renameSync(appJsPath, appJsNewPath);
    let indexHtml = fs.readFileSync(path.join(config.build.assetsRoot, 'index.html'), 'utf-8')
    indexHtml = indexHtml.replace('./static/app.min.js', './static/' + 'app.' + stats.hash + '.js');
    fs.writeFileSync(path.join(config.build.assetsRoot, 'index.html'), indexHtml, 'utf-8')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
