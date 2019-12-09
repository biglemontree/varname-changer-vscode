"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = console.info;
exports.logError = console.error;
exports.logWarn = console.warn;
/**
 * @description 驼峰转底杠
 * @example variableName => variable_name
*/
exports.toBottomLine = (name) => {
    if (!name) {
        return '';
    }
    const reg = /([A-Z])/g;
    if (reg.test(name)) {
        return name.replace(reg, '_$1').toLowerCase();
    }
    return name;
};
/**
 * @description 底杠转驼峰
 * @example variable_name => variableName
*/
exports.toHump = (name) => {
    if (!name) {
        return '';
    }
    const reg = /\_(\w)/g;
    if (reg.test(name)) {
        return name.replace(reg, (all, letter) => {
            return letter.toUpperCase();
        });
    }
    return name;
};
/**
 * @param str 字符串
 * @description 删除所有引号和双引号
 * @example
 * - "value" => value
 * - 'value' => value
 */
exports.deleteQuote = (str) => {
    if (!str) {
        return '';
    }
    const reg = /\'|\"/g;
    if (reg.test(str)) {
        return str.replace(reg, '');
    }
    return str;
};
//# sourceMappingURL=util.js.map