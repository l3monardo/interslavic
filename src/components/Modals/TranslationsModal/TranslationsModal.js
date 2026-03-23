import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_LANGS, EN, ISV, LANGS } from 'consts';
import { t } from 'translations';
import { hideModalDialog } from 'actions';
import { Dictionary } from 'services';
import { useDictionaryLanguages, useInterfaceLang, useModalDialog, useResults, } from 'hooks';
import { findIntelligibilityIssues, getCyrillic, getLatin, } from 'utils';
import { getWordStatus } from 'utils/getWordStatus';
import { Table } from 'components/Table';
import './TranslationsModal.scss';
function renderTranslate(str) {
    if (str && str[0] === '!') {
        return `🤖 {${str.slice(1)}}[s]@ts;`;
    }
    return `${str}@ts`;
}
export const TranslationsModal = () => {
    const results = useResults();
    const dispatch = useDispatch();
    const modalDialog = useModalDialog();
    const dictionaryLanguages = useDictionaryLanguages();
    useInterfaceLang();
    const item = results.find(({ id }) => id === modalDialog.data.id);
    const onClick = useCallback(() => {
        dispatch(hideModalDialog());
    }, [dispatch]);
    if (!item) {
        return null;
    }
    const addLangsFiltered = ADD_LANGS.filter((lang) => dictionaryLanguages.includes(lang));
    const allLangs = [
        ISV,
        EN,
        ...LANGS,
        ...addLangsFiltered,
    ];
    const intelligibility = Dictionary.getField(item.raw, 'intelligibility');
    const marks = findIntelligibilityIssues(intelligibility);
    const tableData = allLangs.reduce((arr, lang) => {
        const translate = Dictionary.getField(item.raw, lang).toString();
        if (lang === 'isv') {
            return [
                [
                    `{${t('isvEtymologicLatinLang')}}[B]@ts;b;sw=130px;nowrap`,
                    `${getLatin(item.isv, '2')}@ts;lang=isv-Latin`,
                ],
                [
                    `{${t('isvLatinLang')}}[B]@ts;b`,
                    `${getLatin(item.isv, '3')}@ts;lang=isv-Latin`,
                ],
                [
                    `{${t('isvCyrillicLang')}}[B]@ts;b`,
                    `${getCyrillic(item.isv, '3')}@ts;lang=isv-Cyrl`,
                ],
                [
                    '@w=2;S',
                ],
            ];
        }
        return [
            ...arr,
            [
                `{${marks[lang] || ''} ${t(`${lang}Lang`)}}[B]@ts;b`,
                `${renderTranslate(translate)};lang=${lang}`,
            ],
            ((lang === 'bg' && addLangsFiltered.length) ? ([
                '@w=2;S',
            ]) : ([])),
        ];
    }, []);
    const hasMarks = new Set(Object.values(marks).filter(Boolean)).size > 0;
    const wordStatus = getWordStatus(item);
    const extraLegend = hasMarks && (_jsxs(_Fragment, { children: [_jsx("br", {}), "\u26A0\uFE0F \u2013 ", t('translationsLegendIntelligibilityWarning'), ".", _jsx("br", {}), "\uD83D\uDEAB \u2013 ", t('translationsLegendIntelligibilityNone'), ".", _jsx("br", {})] }));
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "modal-dialog__header", children: [_jsx("div", { className: "modal-dialog__header-title", children: t('translatesModalTitle') }), _jsx("button", { className: "modal-dialog__header-close", onClick: onClick, "aria-label": "Close", children: "\u00D7" })] }), _jsxs("div", { className: "modal-dialog__body", children: [wordStatus && (_jsxs("div", { children: [wordStatus.icon, "\u00A0", t(wordStatus.text)] })), _jsx(Table, { data: tableData })] }), _jsx("footer", { className: "modal-dialog__footer", children: _jsxs("div", { className: "modal-legend", children: ["\uD83E\uDD16 \u2013 ", t('translationsLegendMachineTranslations'), ".", extraLegend] }) })] }));
};
//# sourceMappingURL=TranslationsModal.js.map