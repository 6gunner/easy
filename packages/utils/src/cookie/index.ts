export interface CookieAttributes {
  expires?: number | Date | undefined;

  path?: string | undefined;

  domain?: string | undefined

  httpOnly?: boolean | undefined;

  secure?: boolean | undefined;

  sameSite?: "strict" | "lax" | "none" | undefined

  [property: string]: any;

}
/*
 * Cookie
 */

function read(name: string) {
  const value = document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
  return value ? decodeURIComponent(value[1]) : null;
}
function write(name: string, value: string, options?: CookieAttributes) {
  let str = name + "=" + encodeURIComponent(value);
  if (options?.domain) {
    str += "; domain=" + options.domain;
  }
  if (options?.path) {
    str += "; path=" + (options.path || "/");
  }
  if (options?.expires) {
    let expiresDate: Date
    // 如果是number
    if (typeof options.expires === 'number') {
      expiresDate = new Date(Date.now() + options.expires * 864e5);
    } else {
      expiresDate = options.expires;
      str += "; expires=" + expiresDate.toUTCString();
    }
  }
  document.cookie = str;
  return;
}
function del(name: string, options: CookieAttributes) {
  write(
    name,
    '',
    Object.assign({}, options, {
      expires: -1
    })
  )
}
export default {
  read,
  write,
  del
}

