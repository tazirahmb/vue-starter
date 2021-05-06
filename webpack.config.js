// import webpack from 'webpack';
// import path from 'path';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const buildMode = (process.argv[2] || '').split('--')[1] || 'staging';

const GLOBALS = {
  MODE: buildMode,
  __PROD__: buildMode === 'production',
  __DEV__: buildMode === 'development',
  __UAT__: buildMode === 'staging',
};

// export default {
module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'eval',
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web',
  // mode development and production
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
