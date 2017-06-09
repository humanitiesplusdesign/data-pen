const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

const confs = require('./webpack.dist.config.js');
confs[0].plugins.push(new GhPagesWebpackPlugin({
   path: './dist',
   options: { dest: 'test' }
}))

module.exports = confs
