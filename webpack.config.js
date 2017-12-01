const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

const commonConf = require('./webpack.common.config.js');
commonConf.output.path = path.join(__dirname + '/dist-dev')
commonConf.module.rules[0].use.unshift({
  loader: 'angular-hot-loader',
  options: {
    log: false,
    rootElement: 'html'
  }
})
module.exports = [ Object.assign({
  name: 'ui',
  entry: {
    ui: './app/index.ts',
    worker: './app/worker-index.ts',
    'webpack-dev-server-client': 'webpack-dev-server/client'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
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
    new WebpackBuildNotifierPlugin({
      title: "Fibra UI Webpack Build"
    })
  ]
}, commonConf)/*, Object.assign({
  name: 'worker',
  entry: {
    worker: './app/worker-index.ts',
    'webpack-dev-server-client': 'webpack-dev-server/client'
  },
  target: 'webworker',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "Fibra WebWorker Webpack Build"
    })
  ]
}, commonConf)*/];
