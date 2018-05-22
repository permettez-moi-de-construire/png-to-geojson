const path = require('path')
const pkg = require('./package.json')
const _ = require('lodash')

const packageName = pkg.name.split('/').pop()

const libraryName = _.camelCase(packageName)
const fileName = _.kebabCase(packageName)
const outputFile = fileName + '.js'

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /(node_modules)/,
        options: {
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
}

module.exports = config
