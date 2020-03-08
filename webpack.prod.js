const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(), {
  mode: 'production',
  devtool: 'source-map',
  // optimization: {
  //   usedExports: true, // i dont know what both of these do, but they fuck up the source maps
  //   runtimeChunk: 'single',

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
  // },
});
