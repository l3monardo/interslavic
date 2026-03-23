export function startsWith(str, substr) {
    const pos = str.indexOf(substr);
    return pos === 0 || str[pos - 1] === ' ';
}
export function endsWith(str, substr) {
    const begin = str.indexOf(substr);
    const end = begin + substr.length;
    return begin >= 0 && (end === str.length || str[end] === ' ');
}
export function includesExactly(str, substr) {
    return startsWith(str, substr) && endsWith(str, substr);
}
export function includes(str, substr) {
    return str.includes(substr);
}
//# sourceMappingURL=searchStrategies.js.map