const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkHash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['env', { 'modules': false }], 'react'],
        }
      }, {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
      }, {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'less-loader']
      }, {
          test: /\.(jpg|png|gif)$/,
          include: /images/,
          use: [{
              loader: 'url-loader',
              options: {limit: 25000}
            }]
      }
    ]
  },
  plugins: [
    //清除bundle文件夹
    new CleanWebpackPlugin(['dist']),
    // 自动生成dist的html
    new HtmlWebpackPlugin({
      template: './index.html', // 源模板文件
    }),
    // 单独打包外部依赖库。mannifest防止修改原文件后vendor的hash变化
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    }),
  ],
  resolve: {
     // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
     extensions: ['.js', '.jsx', '.json', '.coffee']
  }
}
