import v from 'validate.js';

module.exports = function (hash, field, options, value) {
    options = v.extend({}, this.options, options);
    let needValid = true;
    if (typeof options === 'object' && typeof options.when === 'function') {
        needValid = options.when.call(null, hash);
    }
    if (needValid && v.isEmpty(value)) {
        return options.message || this.message || "can't be blank";
    }
};