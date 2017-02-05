require('babel-polyfill');
require('babel-register');
const path = require('path');
const config = require('config');
config.root = path.resolve('./cli');
const entry = config.root + '/app';
const runner = require(entry).default;
runner(config, process.argv[2]);
