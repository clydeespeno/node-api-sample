import winston from 'winston';
import conf from "./config";
import _ from 'lodash';
import path from 'path';
import mkdirp from 'mkdirp';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = new winston.Logger({
    transports: buildTransports(conf)
});

function buildTransports(conf) {
    const transports = conf.get("logger:transports");
    if (transports) {
        return getTransports(transports)
    }
    return [defaultLogger()];
}

function getTransports(transports) {
    return transports.map(t => {
        if (t.name === "file") {
            mkdirp.sync(path.dirname(t.filename));
            return new DailyRotateFile(_.extend(t, {
                formatter: customFileOutput,
                datePattern: "-yyyy-MM-dd.log"
            }));
        } else {
            return defaultLogger();
        }
    });
}

function defaultLogger() {
    return new (winston.transports.Console)();
}

function customFileOutput(options) {
    const log = _.extend({
        'level': options.level,
        'message': options.message || '',
        '@timestamp': new Date()
    }, options.meta);
    return JSON.stringify(log);
}

export default logger;
