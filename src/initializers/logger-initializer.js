import winston from 'winston';
import stackTrace from 'stack-trace';

export default function (app, cb) {
    const consoleTransport = new winston.transports.Console({
        colorize: true,
        level: (app.env == 'development') ? 'debug' : 'error'
    });

// add hack to capture the name of called module and show it as label when logging
    const baseLog = consoleTransport.log;
    consoleTransport.log = function () {
        const calledFromFile = stackTrace.get()[7].getFileName();
        this.label = calledFromFile.substr(app.config.root.length + 1);
        baseLog.apply(this, arguments);
    };

    app.logger = new (winston.Logger)({
        transports: [consoleTransport]
    });

    cb.call();
};