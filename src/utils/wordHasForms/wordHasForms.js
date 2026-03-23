import { getPartOfSpeech } from 'utils';
export function wordHasForms(isv, details) {
    const pos = getPartOfSpeech(details);
    switch (pos) {
        case 'noun':
        case 'numeral':
        case 'pronoun':
            if (isv.includes(' ') && isv.match(/[^,] [^\[]/)) {
                return false;
            }
        case 'adjective':
        case 'verb':
            return true;
        default:
            return false;
    }
}
//# sourceMappingURL=wordHasForms.js.map