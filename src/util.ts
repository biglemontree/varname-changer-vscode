import * as _ from 'lodash';
import * as vscode from 'vscode';

export const logInfo = console.info;
export const logError = console.error;
export const logWarn = console.warn;
export const vsWindow = vscode.window;
export const message = {
  info: vsWindow.showInformationMessage,
  warn: vsWindow.showWarningMessage,
  error: vsWindow.showErrorMessage,
};
/**
 * @description 驼峰转底杠
 * @example variableName => variable_name
*/
export const toBottomLine = (name:string) => {
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
export const toHump = (name:string) => {
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
export const deleteQuote = (str:string) => {
  if (!str) {
    return '';
  }
  const reg = /\'|\"/g;
  if (reg.test(str)) {
    return str.replace(reg, '');
  }
  return str;
};

export function jsonToHump(text:string) {
  try {
    if (!text) {
      return '';
    }
    const obj = JSON.parse(text);
    // 这个方法会返回一个object类型的对象
    if (!_.isObject(obj)) {
      logWarn('不是一个完整的对象，将按照字符串全局替换~');
      return toHump(text);
    }
    if (_.isArray(obj)) {
      logWarn('请选择对象而非数组！');
      return toHump(text);
    }
    return fieldReplacer(obj);
  } catch (error) {
    logError(error);
    message.error(error);
  }
}

/**
 * 
 * @param obj 
 * @description 递归替换obj的字段名
 */
export function fieldReplacer(obj:any) : any {
  const result:any = {};
  for(let key in obj) {
    const newKey = toHump(key);
    const value = obj[key];
    if (_.isArray(value)) {
      result[newKey] = value.map((item) => fieldReplacer(item));
    } else if (_.isObject(value)) {
      result[newKey] = fieldReplacer(value);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
const ex = {
  "child_name": "赖静",
  "submit_time": "1976-05-31 06:46:28",
  "voice_urls": [
    {
      "voice_url": "https://static-k12edu-camprecord.codemao.cn/oEMA252Dxr8bkVc37H6i630lgui8200b3_145_1571716672000.mp4",
      "voice_time": 66
    },
    {
      "voice_url": "https://static-k12edu-camprecord.codemao.cn/oEMA252Dxr8bkVc37H6i630lgui8200b3_145_1571716672000.mp4",
      "voice_time": 66
    }
  ],
  "comment": "建目车技干价"
};
logInfo(fieldReplacer(ex));
