export function toQueryString(keyValues) {
    return Object.keys(keyValues).map((key) => (`${encodeURIComponent(key)}=${encodeURIComponent(keyValues[key])}`)).join('&');
}
//# sourceMappingURL=toQueryString.js.map