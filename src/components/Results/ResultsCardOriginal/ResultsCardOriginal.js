import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'translations';
import { Clipboard } from 'components';
import './ResultsCardOriginal.scss';
export const ResultsCardOriginal = ({ item, alphabets, caseQuestions, short }) => {
    let latin = item.original;
    if (item.add) {
        latin += ` ${item.add}`;
    }
    let cyrillic = item.originalCyr;
    if (item.addCyr) {
        cyrillic += ` ${item.addCyr}`;
    }
    let gla = item.originalGla;
    if (item.addGla) {
        gla += ` ${item.addGla}`;
    }
    const result = [];
    if (alphabets.latin) {
        result.push({
            str: latin,
            caseInfo: caseQuestions && item.caseInfo,
            lang: 'isv-Latin',
        });
    }
    if (alphabets.cyrillic) {
        result.push({
            str: cyrillic,
            caseInfo: item.caseInfoCyr,
            lang: 'isv-Cyrl',
        });
    }
    if (alphabets.glagolitic) {
        result.push({
            str: gla,
            caseInfo: item.caseInfoGla,
            lang: 'isv-Glag',
        });
    }
    return (_jsxs("span", { className: "results-card-original", children: [_jsx("span", { className: "words", children: result.map(({ str, caseInfo }) => (_jsxs("span", { className: "word", children: [_jsx(Clipboard, { str: str, lang: "isv" }), caseInfo && _jsxs("span", { className: "caseInfo", children: ["(", caseInfo, ")"] })] }, str))) }), !caseQuestions && item.caseInfo &&
                _jsxs("span", { className: "caseInfo", children: ["(+", t(`case${item.caseInfo.slice(1)}`), ")"] }), !short && item.ipa && _jsxs("span", { className: "ipa", children: ["[", item.ipa, "]"] })] }));
};
//# sourceMappingURL=ResultsCardOriginal.js.map