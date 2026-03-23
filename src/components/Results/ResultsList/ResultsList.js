import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { tablesData } from 'consts';
import { t } from 'translations';
import { Dictionary } from 'services';
import { useAlphabets, useCaseQuestions, useFromText, useLang, useLoading, usePosFilter, useResults, useScrollbarWidth, useShortCardView, } from 'hooks';
import { getTablePublicUrl, isScrollBarVisible } from 'utils';
import { Link, ResultsCard, ResultsEmpty } from 'components';
import './ResultsList.scss';
export const ResultsList = () => {
    const alphabets = useAlphabets();
    const caseQuestions = useCaseQuestions();
    const worksheetUrl = getTablePublicUrl(tablesData[0].spreadsheetId, tablesData[0].sheetId);
    const results = useResults();
    const posFilter = usePosFilter();
    const lang = useLang();
    const containerRef = useRef();
    const fromText = useFromText();
    const short = useShortCardView();
    const empty = results.length === 0 && fromText.length !== 0;
    const scrollWidth = useScrollbarWidth();
    const [scrollIsVisible, setScrollBarVisible] = useState(false);
    const loading = useLoading();
    useEffect(() => {
        setScrollBarVisible(isScrollBarVisible(containerRef));
    }, [containerRef, results.length]);
    if (!results || !results.length) {
        if (empty && !loading) {
            return (_jsx(ResultsEmpty, { showReset: posFilter !== '' }));
        }
        return null;
    }
    const translatedPart = Dictionary.getPercentsOfTranslated()[lang.from === 'isv' ? lang.to : lang.from];
    return (_jsxs("div", { className: classNames('results-list', { short }), "data-testid": "results-list", style: {
            paddingLeft: scrollIsVisible ? scrollWidth : 0,
        }, ref: containerRef, children: [results.map((item, index) => (_jsx(ResultsCard, { item: item, short: short, index: index, alphabets: alphabets, caseQuestions: caseQuestions }, item.id))), results.some((item) => !item.checked) && (_jsxs("div", { className: "results-list__message-for-users", children: [t('notVerifiedText').replace('part%', `${translatedPart}%`), ' ', _jsx(Link, { external: true, href: worksheetUrl, children: t('notVerifiedTableLinkText') })] }))] }));
};
//# sourceMappingURL=ResultsList.js.map