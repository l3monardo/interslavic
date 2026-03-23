import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dictionary } from 'services';
import { InputText } from 'components/InputText';
import { t } from 'translations';
import { useLang, useDictionaryLanguages } from 'hooks';
import { Selector } from 'components/Selector';
import { EN, ISV } from 'consts';
import './CompareSearch.scss';
export const CompareSearch = ({ onSelect, onClear, placeholder }) => {
    const globalLang = useLang();
    const [from, setFrom] = useState(globalLang.from);
    const [to, setTo] = useState(globalLang.to);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const dictionaryLanguages = useDictionaryLanguages();
    const flavorisationType = useSelector((state) => state.flavorisationType);
    const alphabetType = useSelector((state) => state.alphabetType);
    const caseQuestions = useSelector((state) => state.caseQuestions);
    useEffect(() => {
        if (query.length > 1) {
            const timer = setTimeout(() => {
                const [rawResults] = Dictionary.translate({
                    inputText: query,
                    from,
                    to,
                    searchType: 'begin',
                    posFilter: '',
                    flavorisationType,
                }, false);
                const formatted = Dictionary.formatTranslate(rawResults, from, to, flavorisationType, {
                    latin: true,
                    cyrillic: alphabetType === 'cyrillic',
                    glagolitic: alphabetType === 'glagolitic',
                }, caseQuestions);
                setResults(formatted);
                setIsOpen(true);
            }, 200);
            return () => clearTimeout(timer);
        }
        else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query, from, to, flavorisationType, alphabetType, caseQuestions]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSelect = (item) => {
        onSelect(item);
        setQuery('');
        setIsOpen(false);
    };
    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };
    const options = [EN, ...dictionaryLanguages].map((value) => ({
        name: t(`${value}Lang`),
        value,
    }));
    return (_jsxs("div", { className: "compare-search", ref: wrapperRef, children: [_jsxs("div", { className: "compare-search__controls", children: [_jsx(InputText, { className: "compare-search__input", size: "S", value: query, onChange: setQuery, placeholder: placeholder || t('compareWithPlaceholder') || 'Compare with...' }), _jsxs("div", { className: "compare-search__langs", children: [_jsx(Selector, { className: "compare-search__selector", options: from === ISV ? [{ name: t('isvLang'), value: ISV }] : options, value: from, onSelect: setFrom }), _jsx("button", { className: "compare-search__swap", onClick: handleSwap, title: t('changeDirection'), children: "\u21C4" }), _jsx(Selector, { className: "compare-search__selector", options: to === ISV ? [{ name: t('isvLang'), value: ISV }] : options, value: to, onSelect: setTo })] })] }), isOpen && results.length > 0 && (_jsx("div", { className: "compare-search__suggestions", children: results.map((res) => (_jsxs("div", { className: "compare-search__item", onClick: () => handleSelect(res), children: [_jsx("span", { className: "compare-search__word", children: res.original }), _jsx("span", { className: "compare-search__translate", children: res.translate })] }, res.id))) }))] }));
};
//# sourceMappingURL=CompareSearch.js.map