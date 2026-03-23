import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_LANGS, EN, interfaceLanguageList } from 'consts';
import { t } from 'translations';
import { changeCardViewAction, changeCaseQuestions, changeDictionaryLangAction, changeDisplayImperfect, changeIsvSearchByWordForms, changeIsvSearchLetters, changeOrderOfCases, langAction, runSearch, setAlphabets, setInterfaceLang, togglePage, toggleThemeAction, } from 'actions';
import { fetchLang } from 'services';
import { useAlphabets, useCaseQuestions, useColorTheme, useDictionaryLanguages, useDisplayImperfect, useEnabledPages, useInterfaceLang, useIsvSearchByWordForms, useIsvSearchLetters, useLang, useOrderOfCases, useResults, useShortCardView, } from 'hooks';
import { Checkbox, Selector, Spinner } from 'components';
import './Settings.scss';
const orderOfCasesList = [
    'nom,acc,gen,loc,dat,ins,voc',
    'nom,acc,gen,dat,loc,ins,voc',
    'nom,gen,dat,acc,ins,loc,voc',
    'nom,gen,dat,acc,voc,loc,ins',
    'nom,gen,dat,acc,voc,ins,loc',
];
const standardOrthography = [
    ['ž š č (ж ш ч)', 'ž', 'žšč'],
    ['ě (є)', 'ě', 'ě'],
    ['y (ы)', 'y', 'y'],
];
const etymologicalOrthography = [
    ['å', 'å', 'å'],
    ['ę ų', 'ę', 'ęų'],
    ['ė ȯ', 'ȯ', 'ėȯ'],
    ['ŕ', 'ŕ', 'ŕ'],
    ['ĺ ń', 'ĺ', 'ĺń'],
    ['t́ d́', 'ť', 'ťď'],
    ['ś ź', 'ś', 'śź'],
    ['ć', 'ć', 'ć'],
    ['đ', 'đ', 'đ'],
];
const orthographySettings = [
    ['standardOrthography', standardOrthography],
    ['etymologicalOrthography', etymologicalOrthography],
];
export const Settings = () => {
    const dispatch = useDispatch();
    const interfaceLang = useInterfaceLang();
    const alphabets = useAlphabets();
    const isvSearchLetters = useIsvSearchLetters();
    const isShortCardView = useShortCardView();
    const isDarkTheme = useColorTheme() === 'dark';
    const isvSearchByWordForms = useIsvSearchByWordForms();
    const caseQuestions = useCaseQuestions();
    const displayImperfect = useDisplayImperfect();
    const orderOfCases = useOrderOfCases();
    const dictionaryLanguages = useDictionaryLanguages();
    const enabledPages = useEnabledPages();
    const { from, to } = useLang();
    const [isLoading, setLoading] = useState(false);
    useResults();
    return (_jsxs("div", { className: "settings", children: [_jsx("h5", { className: "settings__title", children: t('settingsTitle') }), _jsx("hr", {}), _jsx("p", { className: "settings__section-title", children: t('interfaceLanguage') }), _jsx(Selector, { options: interfaceLanguageList, value: interfaceLang, onSelect: (langCode) => dispatch(setInterfaceLang(langCode)) }), _jsx("hr", {}), _jsx(Checkbox, { className: "bold", title: t('shortCardView'), checked: isShortCardView, onChange: () => dispatch(changeCardViewAction()) }), _jsx("hr", {}), _jsx(Checkbox, { className: "bold", title: t('darkTheme'), checked: isDarkTheme, onChange: () => dispatch(toggleThemeAction(isDarkTheme ? 'light' : 'dark')) }), _jsx("hr", {}), _jsx("p", { className: "settings__section-title", children: t('showSlavicWordsInAlphabets') }), Object.keys(alphabets).map((alphabet) => (_jsx(Checkbox, { title: t(alphabet), checked: alphabets[alphabet], onChange: () => dispatch(setAlphabets({ [alphabet]: !alphabets[alphabet] })) }, alphabet))), _jsx("hr", {}), _jsx("p", { className: "settings__section-title", children: t('searchSensitiveLettersForInterslavic') }), _jsx("div", { className: "settings__isv-search-letters", children: orthographySettings.map(([title, letters]) => (_jsxs("div", { children: [_jsx("p", { children: t(title) }), letters.map(([title, value, action]) => (_jsx(Checkbox, { title: title, checked: isvSearchLetters.from.includes(value), onChange: () => dispatch(changeIsvSearchLetters(action)) }, title)))] }, title))) }), _jsx("hr", {}), _jsx(Checkbox, { className: "bold", title: t('searchByIsvWordForms'), checked: isvSearchByWordForms, onChange: () => dispatch(changeIsvSearchByWordForms(!isvSearchByWordForms)) }), _jsx("hr", {}), _jsx("p", { className: "settings__section-title", children: t('orderOfCases') }), _jsx(Selector, { options: orderOfCasesList.map((e) => {
                    return {
                        name: e.split(',').map((c) => t(`case${c[0].toUpperCase()}${c.slice(1)}`)).join(', '),
                        value: e,
                    };
                }), value: orderOfCases.join(','), onSelect: (orderOfCases) => dispatch(changeOrderOfCases(orderOfCases.split(','))) }), _jsx("hr", {}), _jsx(Checkbox, { className: "bold", title: t('caseQuestionsForPrepositions'), checked: caseQuestions, onChange: () => dispatch(changeCaseQuestions(!caseQuestions)) }), _jsx("hr", {}), _jsx(Checkbox, { className: "bold", title: t('showImperfectAndPluperfect'), checked: displayImperfect, onChange: () => dispatch(changeDisplayImperfect(!displayImperfect)) }), _jsx("hr", {}), _jsxs("p", { className: "settings__section-title", children: [t('addDictionaryLanguages'), isLoading && (_jsx(Spinner, { size: "10px", borderWidth: "3px" }))] }), _jsx("div", { className: classNames('settings__add-langs', { 'settings__add-langs-loading': isLoading }), children: ADD_LANGS.map((lang) => {
                    const checked = dictionaryLanguages.includes(lang);
                    return (_jsx(Checkbox, { title: t(`${lang}Lang`), checked: checked, onChange: async () => {
                            setLoading(true);
                            await fetchLang(lang);
                            if (checked && from === lang) {
                                dispatch(langAction({
                                    from: EN,
                                    to,
                                }));
                            }
                            if (checked && to === lang) {
                                dispatch(langAction({
                                    from,
                                    to: EN,
                                }));
                            }
                            dispatch(changeDictionaryLangAction(lang));
                            dispatch(runSearch());
                            setLoading(false);
                        } }, lang));
                }) }), _jsx("hr", {}), _jsxs("div", { children: [_jsx("p", { className: "settings__section-title", children: t('devTools') }), _jsx(Checkbox, { title: t('viewerEnable'), checked: enabledPages.includes('viewer'), onChange: () => dispatch(togglePage('viewer')) }, "viewer")] })] }));
};
//# sourceMappingURL=Settings.js.map