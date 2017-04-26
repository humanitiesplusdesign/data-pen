var glob = require("glob");
var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // watch: true,
  context: __dirname,
  entry: {
    ui: './app/index.ts',
    worker: './app/worker-index.ts'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname + 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ng-annotate-loader!babel-loader!ts-loader',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
            { from: 'app/bower_components', to: 'bower_components' }]),
    new HtmlWebpackPlugin({
      chunks: ['ui'],
      filename: 'index.html',
      favicon: 'app/favicon.ico',
      template: 'app/index.pug'
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devServer: {
    hot: true,
    port: 3000
  }
};
