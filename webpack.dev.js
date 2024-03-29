const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0' // enables external access
  },
});
