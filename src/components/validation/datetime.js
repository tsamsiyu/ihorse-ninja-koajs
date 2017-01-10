import moment from 'moment';

export default {
    parse: function(value, options) {
        return +moment.utc(value);
    },
    format: function(value, options) {
        const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
};