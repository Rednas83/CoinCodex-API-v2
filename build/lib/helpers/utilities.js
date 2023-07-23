"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Internal helper to check if parameter is a string */
const isString = (iValue) => {
    return (typeof iValue === 'string' || iValue instanceof String);
};
/** Internal helper to check if string is empty */
const isStringEmpty = (str) => {
    if (!isString(str))
        return false;
    return (str.length == 0);
};
/** Internal helper to check if parameter is a date  */
const isDate = (date) => {
    if (isString(date) || Array.isArray(date) || date == undefined || date == null)
        return false;
    return (date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date));
};
/** Internal helper to check if parameter is an object  */
const isObject = (obj) => {
    if (Array.isArray(obj) || isDate(obj))
        return false;
    return (obj !== null && typeof obj === 'object');
};
/** Internal helper to check if parameter is a number */
const isNumber = (num) => {
    return (!isNaN(num) && !isNaN(parseInt(num)));
};
/** Internal helper to emit a warning to the console */
const _WARN_ = (title, detail) => {
    process.emitWarning(title, {
        detail,
        code: 'CoinCodex',
    });
    return true;
};
exports.default = {
    isString,
    isStringEmpty,
    isDate,
    isObject,
    isNumber,
    _WARN_,
};
