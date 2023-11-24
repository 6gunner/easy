export interface CookieAttributes {
    expires?: number | Date | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    httpOnly?: boolean | undefined;
    secure?: boolean | undefined;
    sameSite?: "strict" | "lax" | "none" | undefined;
    [property: string]: any;
}
declare function read(name: string): string | null;
declare function write(name: string, value: string, options?: CookieAttributes): void;
declare function del(name: string, options: CookieAttributes): void;
declare const _default: {
    read: typeof read;
    write: typeof write;
    del: typeof del;
};
export default _default;
