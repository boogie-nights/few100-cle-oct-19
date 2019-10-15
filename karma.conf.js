const webpack = require('./webpack.test.config');
webpack.mode = 'development';
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            { pattern: 'spec/*.spec.js', watched: false },
            { pattern: 'spec/**/*.spec.js', watched: false },
          { pattern: 'spec/*.spec.ts', watched: false },
            { pattern: 'spec/**/*.spec.ts', watched: false }
        ],

        preprocessors: {
            'spec/*.spec.js': ['webpack', 'sourcemap'],
            'spec/**/*.spec.js': ['webpack', 'sourcemap'],
            'spec/*.spec.ts': ['webpack', 'sourcemap'],
            'spec/**/*.spec.ts': ['webpack', 'sourcemap']
        },

        webpack,

        reporters: ['progress', 'karma-typescript'],

        browsers: ['ChromeHeadless'], // or just 'Chrome', 'ie', 'firefox', etc.
   
        
    });
};