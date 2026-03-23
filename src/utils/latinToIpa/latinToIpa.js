import { transliterate } from '@interslavic/utils';
export function latinToIpa(text) {
    return transliterate(text, 'isv-x-fonipa');
}
//# sourceMappingURL=latinToIpa.js.map