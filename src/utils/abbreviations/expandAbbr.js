import { analyzeAbbr } from './analyzeAbbr';
export function expandAbbr(t, abbr) {
    const analyzed = analyzeAbbr(abbr);
    return analyzed.filter(shouldBeShownToUser).map((key) => t(key)).join(', ');
}
function shouldBeShownToUser(verbModifier) {
    // "main verb" (as opposed to auxiliary) doesn't make sense to show in the UI
    return verbModifier !== 'verb-main';
}
//# sourceMappingURL=expandAbbr.js.map