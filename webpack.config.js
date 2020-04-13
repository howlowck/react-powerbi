const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const env = require('yargs').argv.env // use --env with webpack 2

const libraryName = 'react-powerbi'

const plugins =
  [
    new CleanWebpackPlugin()
  ]

let rootName = libraryName

if (env === 'build') {
  rootName += '.min'
}
const outputFile = rootName + '.js'

const config = {
  entry: './src/index.tsx',
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
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.tsx|\.ts)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.ts', '.tsx'],
    plugins: [new TsConfigPathsPlugin({
      tsconfig: __dirname + '/tsconfig.json'
    })]
  },
  externals: {
    'jsdom': 'window',
    'react': 'react'
  },
  plugins: plugins
}

module.exports = config
