const path = require('path');

const dev = {
    "debug": true,
    "server": {
        "port": 3005
    },
    "mongoose": {
        "uri": "mongodb://127.0.0.1:27017/horsinja"
    }
};
dev.root = path.resolve('src');

module.exports = dev;