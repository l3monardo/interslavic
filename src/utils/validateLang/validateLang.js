import { ADD_LANGS, EN, LANGS } from 'consts';
export function validateLang(lang) {
    const validLangs = [
        EN,
        ...LANGS,
        ...ADD_LANGS,
    ].reduce((acc, lang) => [...acc, `isv-${lang}`, `${lang}-isv`], []);
    return Boolean(lang && validLangs.includes(lang));
}
//# sourceMappingURL=validateLang.js.map