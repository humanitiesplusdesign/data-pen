const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

const commonConf = require('./webpack.common.config.js');
commonConf.watch = false
commonConf.output.path = path.join(__dirname + '/dist')

module.exports = [ Object.assign({
  name: 'ui',
  entry: {
    ui: './app/index.ts'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['ui'],
      filename: 'index.html',
      favicon: 'app/favicon.ico',
      template: 'app/index.pug'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "common-bundle.js"
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV':  '"production"'}),
    new webpack.NoEmitOnErrorsPlugin(),
    new BitBarWebpackProgressPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "Fibra UI Webpack Distribution Build"
    })
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
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "Fibra WebWorker Webpack Distribution Build"
    })
  ]}, commonConf)
];
