var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var commonConf = require('./webpack.common.config.js');
commonConf.watch = false
commonConf.output.path = path.join(__dirname + '/dist')

module.exports = [ Object.assign({
  name: 'ui',
  entry: {
    ui: './app/index.ts'
  },
  plugins: [
    new CopyWebpackPlugin([
            { from: 'app/bower_components', to: 'bower_components' }]),
    new HtmlWebpackPlugin({
      chunks: ['ui'],
      filename: 'index.html',
      favicon: 'app/favicon.ico',
      template: 'app/index.pug'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV':  '"production"'}),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, commonConf), Object.assign({
  name: 'worker',
  entry: {
    worker: './app/worker-index.ts'
  },
  target: 'webworker',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.NoEmitOnErrorsPlugin()
  ]}, commonConf)
];
