const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackCommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(webpackCommonConfig, {
  plugins: [
    // config environment : production that will build minified react 
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Uglify的配置
    new UglifyJSPlugin()
  ],
})
