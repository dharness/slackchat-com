require('dotenv').config({path: './../.env'});
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: {
    chindow: './chindow/index.js'
  },
  output: {
    filename: './chindow/[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      }, {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        SC_SOCKET_URL: JSON.stringify(process.env.SC_SOCKET_URL),
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new ExtractTextPlugin('styles.bundle.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /styles\.bundle\.css$/,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};