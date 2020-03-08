const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(), {
  mode: 'production',
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',

    // moduleIds: 'hashed',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // }
  },
});
