/* global __dirname, require, module */
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2

let libraryName = 'react-powerbi'

let plugins = 
  [
    new CleanWebpackPlugin()
  ]

let rootName = libraryName

if (env === 'build') {
  rootName += '.min'
}
const outputFile = rootName + '.js'

plugins.push(new CopyPlugin(
  [{ from: './src/index.d.ts', to: rootName+'.d.ts' }]
  ))

const config = {
  entry: './src/index.js',
  devtool: 'source-map',
  context: __dirname,
  output: {
    path: path.resolve('./lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  externals: {
    'jsdom': 'window',
    'react': 'react'
  },
  plugins: plugins
}

module.exports = config
