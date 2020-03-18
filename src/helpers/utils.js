export const isHttp = (url) => /^http/.test(url)

export const capitalize =
  (str) => str[0].toUpperCase() + str.slice(1);

export const isFunction =
  (obj) => obj.constructor.name === "Function";
