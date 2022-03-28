function typeOf(obj: unknown) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  // @ts-ignore
  return map[toString.call(obj)];
}

export { typeOf };

export const isFilledArray = (arr: unknown) => {
  return Array.isArray(arr) && arr.length > 0;
};

// unique array by given key
export const getUniqueArrayByKey = <T>(arr: T[], uniqueKey = 'id'): T[] => {
  const isEveryObject = arr.every((item) => typeOf(item) === 'object');
  if (!isFilledArray(arr) || arr.length === 1 || !isEveryObject) return arr;
  const hash: T[keyof T][] = [];
  return arr.reduce((item, next) => {
    const k = next[uniqueKey as keyof typeof next];
    if (k && !hash.includes(k)) {
      hash.push(k);
      item.push(next);
    }
    return item;
  }, [] as T[]);
};

export const removeTagDIV = (str: string) => {
  const reg = /<div[^>]*?>|<\/div>/gi;
  return str.replace(reg, '');
};

export const escape2Html = (str: string) => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (_, t) {
    // @ts-ignore
    return arrEntities[t];
  });
};

export const trimHtml = (str: string) => {
  return removeTagDIV(escape2Html(str));
};
