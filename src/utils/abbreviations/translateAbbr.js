import { analyzeAbbr } from './analyzeAbbr';
export function translateAbbr(t, abbr) {
    const analyzed = analyzeAbbr(abbr);
    if (analyzed.length === 0) {
        return abbr;
    }
    return analyzed.filter(shouldBeShownInAbbreviation).map((key) => t(`abbr-${key}`)).filter(Boolean).join(' ');
}
function shouldBeShownInAbbreviation(key) {
    return key !== 'verb-main' && key !== 'noun-inanimate';
}
//# sourceMappingURL=translateAbbr.js.map