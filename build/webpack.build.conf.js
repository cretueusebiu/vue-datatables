const webpack = require('webpack')
const config = require('../config')
var merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    lib: './src/main.js'
  },
  output: {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: 'vue-datatables.js',
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'Vue',
      root: 'Vue'
    },
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jQuery',
      root: 'jQuery'
    }
  },
  devtool: config.bundle.productionSourceMap ? '#source-map' : false
})

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = webpackConfig
