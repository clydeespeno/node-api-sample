var path = require('path');
var webpack = require('webpack');
var sourceDirectory = path.resolve('./src');
var distDirectory = path.resolve('.dist');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = function (environment) {
  return {
    output: getOutput(),
    module: {
      preLoaders: getPreloaders(environment),
      loaders: getLoaders(),
      noParse: /node_modules\/json-schema\/lib\/validate\.js/
    },
    plugins: getPlugins(environment),
    resolve: getResolve(),
    node: getNode(),
    devtool: 'source-map',
    eslint: {
      failOnError: false,
      failOnWarning: false
    }
  };
};

function getNode() {
  return {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    chalk: 'empty'
  }
}

function getResolve() {
  return {
    root: sourceDirectory,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  }
}

function getOutput() {
  return {
    filename: 'js/[name].js',
    path: distDirectory
  };
}

function getPlugins(environment) {
  if (environment === 'development') {
    return [new Visualizer()]
  }
  return [];
}

function getPreloaders(environment) {
  if (environment === 'test') {
    return getTestPreloader();
  }

  return [{test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}];
}

function getTestPreloader() {
  return [{
    test: /\.(js|jsx)$/,
    exclude: [
      /(node_modules)\//,
      /test\./,
      /\.spec/,
      /\.story/
    ],
    loader: 'isparta',
    query: {
      babel: {
        presets: ['es2015', 'react', 'stage-0']
      },
      compact: false,
      cacheDirectory: true
    }
  }];
}

function getLoaders() {
  return [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
        cacheDirectory: true,
        compact: false
      }
    },
    {
      test: /\.json$/,
      loader: 'json'
    }];
}
