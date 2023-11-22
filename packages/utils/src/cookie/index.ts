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
export default {
  read: function (name: string) {
    const value = document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
    return value ? decodeURIComponent(value[1]) : null;
  },
  write: function (name: string, value: string, options?: CookieAttributes) {
    let str = value.name + "=" + encodeURIComponent(value.value);
    if (value.domain) {
      str += "; domain=" + value.domain;
    }
    str += "; path=" + (value.path || "/");
    if (value.day) {
      const time = new Date();
      time.setTime(time.getTime() + value.day * 24 * 60 * 60 * 1000);
      str += "; expires=" + time.toUTCString();
    }
    if (value.expires) {
      str += "; expires=" + value.expires.toUTCString();
    }
    document.cookie = str;
    return;
  },
  del: function (name: string, options: CookieAttributes) {
    const opt = options || {};
    opt.name = name;
    opt.day = -1;
    opt.value = "a";
    this.write(opt);
    return;
  }
};
