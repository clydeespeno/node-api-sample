module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    client: {
      captureConsole: true
    },
    singleRun: true,
    frameworks: ['mocha'],
    files: [{
      pattern: 'test/test.setup.js',
      watched: false,
      served: true,
      included: true
    }],
    preprocessors: {
      'test/test.setup.js': ['webpack']
    },
    reporters: ['mocha'],
    webpack: require('./webpack.config.js')('test'),
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [{type: 'lcov', subdir: 'report-lcov'}]
    }
  });
};
