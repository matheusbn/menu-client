const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = env => {
  console.log(process.env.NODE_ENV)
  return {
    entry: {
      app: './src/index.tsx',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        // {
        //   enforce: 'pre',
        //   test: /\.js?$/,
        //   use: 'source-map-loader',
        // },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        // Use Preact instead of React.
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        src: path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        helpers: path.resolve(__dirname, './src/helpers'),
        hooks: path.resolve(__dirname, './src/hooks'),
        models: path.resolve(__dirname, './src/models'),
        pages: path.resolve(__dirname, './src/pages'),
        router: path.resolve(__dirname, './src/router'),
        services: path.resolve(__dirname, './src/services'),
        contexts: path.resolve(__dirname, './src/contexts'),
        reducers: path.resolve(__dirname, './src/reducers'),
        actions: path.resolve(__dirname, './src/actions'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/[name].js',
      chunkFilename: 'static/[name].js',
      publicPath: '/',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html',
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
      }),
    ],
  }
}
