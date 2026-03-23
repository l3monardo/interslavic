export function filterNiqqud(text) {
    return text
        .replace(/[\u0591-\u05BD\u05BF-\u05C7]/g, '')
        .replace(/\u05BE/g, '-');
}
//# sourceMappingURL=filterNiqqud.js.map