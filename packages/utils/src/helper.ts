export function lineToCamelCase(targetString: string) {
  return targetString.replace(/_(\w)/g, function (match, letter) {
    // a_s  aS
    // c_f   cF
    return letter.toUpperCase();
  });
}

/**
 * @function unescapeHTML 还原html脚本 < > & " '
 * @param a - 字符串
 */
export function unescapeHTML(a: string) {
  a = '' + a;
  return a
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/**
 * 驼峰转下划线
 * @param str
 * @returns {*}
 */
export function camelCaseToLine(targetString: string) {
  return targetString.replace(/([A-Z])/g, function (match) {
    return '_' + match.toLowerCase();
  });
}