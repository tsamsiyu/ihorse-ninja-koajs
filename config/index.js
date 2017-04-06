const _ = require('lodash');

const env = process.env.NODE_ENV;
const config = {env};
const envConfig = require(`config/environment/${env}`);

// defaults
// _.set(config, 'mongoose.server.socketOptions.keepAlive', 1);
_.set(config, 'debug', false);
_.set(config, 'server.port', 80);

module.exports = _.merge(config, envConfig);