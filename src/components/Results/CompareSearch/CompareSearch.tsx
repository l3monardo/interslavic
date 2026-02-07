import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IMainState } from 'reducers';
import { Dictionary, ITranslateResult } from 'services';
import { InputText } from 'components/InputText';
import { t } from 'translations';
import { useLang, useDictionaryLanguages } from 'hooks';
import { Selector } from 'components/Selector';
import { EN, ISV } from 'consts';

import './CompareSearch.scss';

interface ICompareSearchProps {
    onSelect: (item: ITranslateResult | null) => void;
    onClear: () => void;
    placeholder?: string;
}

export const CompareSearch: React.FC<ICompareSearchProps> = ({ onSelect, onClear, placeholder }) => {
    const globalLang = useLang();
    const [from, setFrom] = useState(globalLang.from);
    const [to, setTo] = useState(globalLang.to);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ITranslateResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dictionaryLanguages = useDictionaryLanguages();

    const flavorisationType = useSelector((state: IMainState) => state.flavorisationType);
    const alphabetType = useSelector((state: IMainState) => state.alphabetType);
    const caseQuestions = useSelector((state: IMainState) => state.caseQuestions);

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

                const formatted = Dictionary.formatTranslate(
                    rawResults,
                    from,
                    to,
                    flavorisationType,
                    {
                        latin: true,
                        cyrillic: alphabetType === 'cyrillic',
                        glagolitic: alphabetType === 'glagolitic',
                    },
                    caseQuestions
                );
                setResults(formatted);
                setIsOpen(true);
            }, 200);

            return () => clearTimeout(timer);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query, from, to, flavorisationType, alphabetType, caseQuestions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: ITranslateResult) => {
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

    return (
        <div className="compare-search" ref={wrapperRef}>
            <div className="compare-search__controls">
                <InputText
                    className="compare-search__input"
                    size="S"
                    value={query}
                    onChange={setQuery}
                    placeholder={placeholder || t('compareWithPlaceholder') || 'Compare with...'}
                />
                <div className="compare-search__langs">
                    <Selector
                        className="compare-search__selector"
                        options={from === ISV ? [{ name: t('isvLang'), value: ISV }] : options}
                        value={from}
                        onSelect={setFrom}
                    />
                    <button className="compare-search__swap" onClick={handleSwap} title={t('changeDirection')}>
                        ⇄
                    </button>
                    <Selector
                        className="compare-search__selector"
                        options={to === ISV ? [{ name: t('isvLang'), value: ISV }] : options}
                        value={to}
                        onSelect={setTo}
                    />
                </div>
            </div>
            {isOpen && results.length > 0 && (
                <div className="compare-search__suggestions">
                    {results.map((res) => (
                        <div
                            key={res.id}
                            className="compare-search__item"
                            onClick={() => handleSelect(res)}
                        >
                            <span className="compare-search__word">{res.original}</span>
                            <span className="compare-search__translate">{res.translate}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
