const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');

module.exports = merge(webpackCommonConfig, {
  // open source map
  devtool: 'inline-source-map',
  // config devserver
  devServer: {
    contentBase: './dist'
  }
})
