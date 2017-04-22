var glob = require("glob");

module.exports = {
  context: __dirname,
  entry: './app/index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ng-annotate-loader!ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  externals: {
    angular: 'angular',
    fi: 'angular-sparql-service'
  }
};