var glob = require("glob");
var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConf = {
  cache: true,
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname + '/dist'),
    publicPath: 'http://localhost:3000/'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [ {
          loader: 'angular-hot-loader',
          options: {
            log: false,
            rootElement: 'html'
          }
        }, 'babel-loader', 'ts-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      }
    ]
  },
  resolve: {
    modules: ["node_modules", "app/bower_components"],
    descriptionFiles: ["package.json", "bower.json"],
    extensions: [".tsx", ".ts", ".js", ".styl", ".pug", ".css"]
  },
  externals: {
    angular: 'angular',
    fi: 'angular-sparql-service'
  },
  devServer: {
    hot: true,
    inline: true,
    port: 3000,
    stats: { chunkModules: false }
  }
};

module.exports = [ Object.assign({
  name: 'ui',
  entry: {
    ui: './app/index.ts',
    'webpack-dev-server-client': 'webpack-dev-server/client?http://localhost:8090'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
            { from: 'app/bower_components', to: 'bower_components' }]),
    new HtmlWebpackPlugin({
      chunks: ['ui'],
      filename: 'index.html',
      favicon: 'app/favicon.ico',
      template: 'app/index.pug'
    }),
    new ExtractTextPlugin('styles.css')
  ]
}, commonConf), Object.assign({
  name: 'worker',
  entry: { worker: './app/worker-index.ts' },
  target: 'webworker',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}, commonConf)];
