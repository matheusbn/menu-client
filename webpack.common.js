const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = env => {
  console.log(process.env.NODE_ENV)
  return {
    entry: {
      app: './src/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.svg$/,
          use: {
            loader: '@svgr/webpack',
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        // Use Preact instead of React.
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      }
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/[name].js',
      chunkFilename: 'static/[name].js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html'
      }),
      new CopyPlugin([
        './public/index.html',
        './public/manifest.json',
        './public/robots.txt',
        './public/favicon.ico',
        './public/logo192.png',
        './public/logo512.png',
        // { from: './src/service-worker.js' },
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/service-worker.js',
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
      })
    ],
  }
}
