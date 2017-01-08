const config = require('config');
const entry = config.root + '/app';

require('babel-polyfill');
if (config.env === 'development') {
    require('babel-register');
}

const runner = require(entry).default;
runner(config);