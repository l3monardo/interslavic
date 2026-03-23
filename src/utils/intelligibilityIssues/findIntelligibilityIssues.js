const REGEXP = /^!?(\w+)(.?)/;
const EMPTY = {};
export function findIntelligibilityIssues(sameInLanguages) {
    const result = (sameInLanguages || '').split(' ').reduce((acc, tag) => {
        const [, lang, mark] = tag.match(REGEXP) || [];
        const emoji = translateToEmoji(mark);
        if (lang && emoji) {
            acc[lang] = translateToEmoji(mark);
        }
        return acc;
    }, {});
    return Object.keys(result).length ? result : EMPTY;
}
function translateToEmoji(mark) {
    switch (mark) {
        case '-':
            return '🚫';
        case '~':
            return '⚠️';
        case '+':
            return '✅';
        default:
            return '';
    }
}
//# sourceMappingURL=findIntelligibilityIssues.js.map