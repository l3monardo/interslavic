import React, { useState } from 'react';
import cn from 'classnames';
import { wordDefinitions } from '../../data/definitions';
import { useSelector, useDispatch } from 'react-redux';
import { IMainState } from 'reducers';
import { ITranslateResult, Dictionary } from 'services';
import { t } from 'translations';
import {
    expandAbbr,
    getCaseTips,
    getCyrillic,
    getGender,
    getGlagolitic,
    getLatin,
    getNumeralType,
    getPartOfSpeech,
    getPronounType,
    isAnimate,
    isIndeclinable,
    isPlural,
    isSingular,
    findIntelligibilityIssues,
} from 'utils';
import { Table } from 'components/Table';
import { LineSelector } from 'components/LineSelector';
import { CompareSearch } from 'components/Results/CompareSearch/CompareSearch';
import { setAlphabetTypeAction } from 'actions';
import { alphabetTypes, ADD_LANGS, EN, ISV, LANGS } from 'consts';
import { getWordStatus } from 'utils/getWordStatus';
import {
    conjugationVerb,
    declensionAdjective,
    declensionNoun,
    declensionNumeral,
    declensionPronoun
} from '@interslavic/utils';

interface IResultDetailsProps {
    item: ITranslateResult;
    mode: 'forms' | 'translations';
    onCompareChange?: (isComparing: boolean) => void;
}

const ResultTranslations: React.FC<{ item: ITranslateResult; dictionaryLanguages: string[]; itemKey: string }> = React.memo(({ item, dictionaryLanguages, itemKey }) => {
    const flavorisationType = useSelector((state: IMainState) => state.flavorisationType);
    const [defScript, setDefScript] = useState<'latin' | 'cyrillic' | 'glagolitic'>('latin');
    const [expandedWiktionary, setExpandedWiktionary] = useState<{ url: string; word: string; language: string } | null>(null);
    const addLangsFiltered = ADD_LANGS.filter((lang) => dictionaryLanguages.includes(lang));
    const allLangs = [ISV, EN, ...LANGS, ...addLangsFiltered];
    const intelligibility = Dictionary.getField(item.raw, 'intelligibility');
    const marks = findIntelligibilityIssues(intelligibility);

    const getWiktionaryUrl = (lang: string, word: string): string => {
        // Remove leading ! and any special characters
        const cleanWord = word.replace(/^!/, '').trim();
        if (!cleanWord) return '';

        // Map language codes to Wiktionary subdomains
        const wiktionaryLangMap: Record<string, string> = {
            'en': 'en',
            'ru': 'ru',
            'pl': 'pl',
            'cs': 'cs',
            'sk': 'sk',
            'uk': 'uk',
            'be': 'be',
            'bg': 'bg',
            'mk': 'mk',
            'sr': 'sr',
            'hr': 'hr',
            'sl': 'sl',
            'de': 'de',
            'nl': 'nl',
            'eo': 'eo',
        };

        const wiktLang = wiktionaryLangMap[lang];
        if (!wiktLang) return '';

        return `https://${wiktLang}.wiktionary.org/wiki/${encodeURIComponent(cleanWord)}`;
    };

    const handleLanguageClick = (lang: string, translate: string) => {
        const url = getWiktionaryUrl(lang, translate);
        if (url) {
            const newExpanded = {
                url,
                word: translate.replace(/^!/, '').trim(),
                language: t(`${lang}Lang`),
            };

            // Toggle: if clicking the same one, close it
            if (expandedWiktionary?.url === url) {
                setExpandedWiktionary(null);
            } else {
                setExpandedWiktionary(newExpanded);
            }
        }
    };

    const renderTranslate = (str: string, lang: string): string => {
        if (str && str[0] === '!') {
            return `🤖 {${str.slice(1)}}[s]@ts;`;
        }

        // Split by comma and create clickable links for each word
        const words = str.split(',').map(w => w.trim()).filter(w => w);
        if (words.length === 0) return `${str}@ts`;

        const wiktUrl = getWiktionaryUrl(lang, 'test');
        if (!wiktUrl) return `${str}@ts`;

        const linkedWords = words.map(word => {
            return `<span class="wiktionary-word-link" data-item-key="${itemKey}" data-lang="${lang}" data-translate="${word.replace(/" /g, '&quot;')}">${word}</span>`;
        }).join(', ');

        return `${linkedWords} @ts`;
    };

    const tableData = allLangs.reduce((arr, lang) => {
        const translate = Dictionary.getField(item.raw, lang).toString();

        if (lang === 'isv') {
            return [
                [`{${t('isvEtymologicLatinLang')}}[B]@ts;b;sw=130px;nowrap`, `${getLatin(item.isv, '2')}@ts;lang=isv-Latin`],
                [`{${t('isvLatinLang')}}[B]@ts;b`, `${getLatin(item.isv, '3')}@ts;lang=isv-Latin`],
                [`{${t('isvCyrillicLang')}}[B]@ts;b`, `${getCyrillic(item.isv, '3')}@ts;lang=isv-Cyrl`],
                ['@w=2;S'],
            ];
        }

        const langLabel = `${marks[lang] || ''}${t(`${lang}Lang`)}`;

        return [
            ...arr,
            [
                `{${langLabel}}[B]@ts;b`,
                `${renderTranslate(translate, lang)};lang=${lang}`
            ],
            ((lang === 'bg' && addLangsFiltered.length) ? ['@w=2;S'] : []),
        ];
    }, []);

    const wordStatus = getWordStatus(item);

    // Add click event listener for wiktionary links - scoped to this component's itemKey
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const wiktLink = target.closest('.wiktionary-word-link');
            if (wiktLink) {
                const linkItemKey = wiktLink.getAttribute('data-item-key');
                // Only handle clicks for this component's links
                if (linkItemKey === itemKey) {
                    const lang = wiktLink.getAttribute('data-lang');
                    const translate = wiktLink.getAttribute('data-translate');
                    if (lang && translate) {
                        handleLanguageClick(lang, translate);
                    }
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [expandedWiktionary, itemKey]);

    const definition = item.isv
        .split(',')
        .map(w => w.trim().toLowerCase())
        .map(w => wordDefinitions[w])
        .find(Boolean) || null;

    const getRenderedText = (text: string) => {
        if (!text) return '';
        switch (defScript) {
            case 'cyrillic': return getCyrillic(text, flavorisationType);
            case 'glagolitic': return getGlagolitic(text, flavorisationType);
            default: return getLatin(text, flavorisationType);
        }
    };

    const renderedDefinition = getRenderedText(definition);
    const renderedTitle = getRenderedText('Definicija');

    const handleCopy = () => {
        if (renderedDefinition) {
            navigator.clipboard.writeText(renderedDefinition);
        }
    };

    return (
        <div className="result-details result-details--translations">
            {wordStatus && <div className="word-status">{wordStatus.icon}&nbsp;{t(wordStatus.text)}</div>}
            <div className="table-scroll-container">
                <Table data={tableData.filter(row => row.length > 0)} />
            </div>
            {definition && (
                <div className="word-definition-box">
                    <div className="word-definition-box__header">
                        <span className="word-definition-box__title">{renderedTitle}</span>
                        <div className="word-definition-box__controls">
                            <button
                                className="word-definition-box__copy"
                                onClick={handleCopy}
                                title={t('copyDefinition')}
                            >
                                ⎘
                            </button>
                            <LineSelector
                                className="word-definition-box__script-toggle"
                                options={[
                                    { name: 'Lat', value: 'latin' },
                                    { name: 'Cyr', value: 'cyrillic' },
                                    { name: 'Gla', value: 'glagolitic' },
                                ]}
                                value={defScript}
                                onSelect={(val) => setDefScript(val as any)}
                            />
                        </div>
                    </div>
                    <hr className="word-definition-box__divider" />
                    <div className="word-definition-box__text">
                        {renderedDefinition}
                    </div>
                </div>
            )}
            {expandedWiktionary && (
                <div className="wiktionary-expansion">
                    <div className="wiktionary-expansion__header">
                        <span className="wiktionary-expansion__title">
                            {expandedWiktionary.language}: <strong>{expandedWiktionary.word}</strong>
                        </span>
                        <div className="wiktionary-expansion__actions">
                            <a
                                href={expandedWiktionary.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="wiktionary-expansion__external"
                            >
                                Open in new tab →
                            </a>
                            <button
                                className="wiktionary-expansion__close"
                                onClick={() => setExpandedWiktionary(null)}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                    <div className="wiktionary-expansion__content">
                        <iframe
                            src={expandedWiktionary.url}
                            title={`Wiktionary: ${expandedWiktionary.word} `}
                            className="wiktionary-expansion__iframe"
                        />
                    </div>
                </div>
            )}
            <div className="modal-legend">
                <div className="legend-tooltip-container">
                    <span className="legend-tooltip-trigger">ℹ️</span>
                    <div className="legend-tooltip-content">
                        🤖 – {t('translationsLegendMachineTranslations')}.
                        {Object.values(marks).some(Boolean) && (
                            <>
                                <br />⚠️ – {t('translationsLegendIntelligibilityWarning')}.
                                <br />🚫 – {t('translationsLegendIntelligibilityNone')}.
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

const ResultForms: React.FC<{
    item: ITranslateResult;
    alphabetType: string;
    flavorisationType: string;
    orderOfCases: string[];
    displayImperfect: boolean;
    onSetAlphabet: (type: string) => void;
    isComparison?: boolean;
}> = React.memo(({ item, alphabetType, flavorisationType, orderOfCases, displayImperfect, onSetAlphabet, isComparison }) => {
    const COLLECTIVE_OVERRIDES = new Set(['oba', 'obadva', 'obydva']);
    const rawDetails = item.details;
    const baseIsv = item.isv.split(',')[0].trim();
    const details = COLLECTIVE_OVERRIDES.has(baseIsv) && /num\.\s*card\./.test(rawDetails)
        ? rawDetails.replace(/num\.\s*card\./g, 'num.coll.')
        : rawDetails;
    const word = item.isv;
    const add = Dictionary.getField(item.raw, 'addition');

    const formatStr = (str: string): string => {
        if (!str) return '';
        if (str.match(/&\w+;/g)) return str;
        switch (alphabetType) {
            case 'latin': return getLatin(str, flavorisationType);
            case 'cyrillic': return getCyrillic(str, flavorisationType);
            case 'glagolitic': return getGlagolitic(str, flavorisationType);
            default: return str;
        }
    };

    const getSimpleCasesTable = (paradigmArray) => {
        const tableDataCases = [[`${t('case')} @b`]];
        paradigmArray.columns.forEach((col) => {
            tableDataCases[0].push(t(col) + '@b');
        });
        orderOfCases.forEach((caseItem) => {
            if (caseItem in paradigmArray.cases) {
                const caseName = t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`);
                const tableRow = [`${caseName}@b@${formatStr(getCaseTips(caseItem, 'noun'))}`];
                paradigmArray.cases[caseItem].forEach((caseForm) => {
                    tableRow.push(`${formatStr(caseForm)}@`);
                });
                tableDataCases.push(tableRow);
            }
        });
        return tableDataCases;
    };

    const getAdjectiveSingularCasesTable = (singular) => {
        const table = [
            ['&nbsp@bl;bt', `${t('singular')}@w=4;b`],
            [`${t('case')}@h=2;b`, `${t('masculine')}@w=2;b`, `${t('neuter')}@h=2;b`, `${t('feminine')}@h=2;b`],
            [`${t('masculineAnimate')}@b`, `${t('masculineInanimate')}@b`],
        ];
        orderOfCases.forEach((caseItem) => {
            if (caseItem in singular) {
                const tableRow = [`${t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`)}@b@${formatStr(getCaseTips(caseItem, 'adjectiveSingular'))}`];
                switch (caseItem) {
                    case 'nom':
                        tableRow.push(`${formatStr(singular[caseItem][0])}@w=2`, `${formatStr(singular[caseItem][1])}@`, `${formatStr(singular[caseItem][2])}@`);
                        break;
                    case 'acc':
                        tableRow.push(`${formatStr(singular[caseItem][0].split(' / ')[0])}@`, `${formatStr(singular[caseItem][0].split(' / ')[1])}@`, `${formatStr(singular[caseItem][1])}@`, `${formatStr(singular[caseItem][2])}@`);
                        break;
                    default:
                        tableRow.push(`${formatStr(singular[caseItem][0])}@w=3`, `${formatStr(singular[caseItem][1])}@`);
                        break;
                }
                table.push(tableRow);
            }
        });
        return table;
    };

    const getAdjectivePluralCasesTable = (plural) => {
        const table = [
            ['&nbsp@bl;bt', `${t('plural')}@w=3;b`],
            [`${t('case')}@h=2;b`, `${t('masculine')}@w=2;b`, `${t('feminineOrNeuter')}@h=2;b`],
            [`${t('masculineAnimate')}@b`, `${t('masculineInanimate')}@b`],
        ];
        orderOfCases.forEach((caseItem) => {
            if (caseItem in plural) {
                const tableRow = [`${t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`)}@b@${formatStr(getCaseTips(caseItem, 'adjectivePlural'))}`];
                switch (caseItem) {
                    case 'nom':
                    case 'acc':
                        tableRow.push(`${formatStr(plural[caseItem][0].split(' / ')[0])}@`, `${formatStr(plural[caseItem][0].split(' / ')[1])}@`, `${formatStr(plural[caseItem][1])}@`);
                        break;
                    default:
                        tableRow.push(`${formatStr(plural[caseItem][0])}@w=3`);
                        break;
                }
                table.push(tableRow);
            }
        });
        return table;
    };

    const renderNoun = (word, add, details) => {
        const cases = declensionNoun(word, add, getGender(details), isAnimate(details), isPlural(details), isSingular(details), isIndeclinable(details));
        return cases ? <Table data={getSimpleCasesTable({ columns: ['singular', 'plural'], cases })} /> : null;
    };

    const renderAdjective = (word, details) => {
        const { singular, plural, comparison } = declensionAdjective(word, '', details);
        const tableComparison = [
            [`${t('degreesOfComparison')} @b`, `${t('adjective')} @b`, `${t('adverb')} @b`],
            [`${t('positive')} @b`, `${formatStr(comparison.positive[0])} @`, `${formatStr(comparison.positive[1])} @`],
            [`${t('comparative')} @b`, `${formatStr(comparison.comparative[0])} @`, `${formatStr(comparison.comparative[1])} @`],
            [`${t('superlative')} @b`, `${formatStr(comparison.superlative[0])} @`, `${formatStr(comparison.superlative[1])} @`],
        ];
        return (
            <>
                <Table data={getAdjectiveSingularCasesTable(singular)} />
                <Table data={getAdjectivePluralCasesTable(plural)} />
                <Table data={tableComparison} />
            </>
        );
    };

    const renderVerb = (word, add, details) => {
        const data = conjugationVerb(word, add, details);
        if (!data) return null;
        const head1 = ['&nbsp@bl;bt;w=2', `${t('present')} @; b`, ...(displayImperfect ? [`${t('simplePast')} @; b`] : []), `${t('future')} @; b`];
        const pronouns1 = ['ja', 'ty', 'on ona ono', 'my', 'vy', 'oni one'];
        const forms1 = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
        const table1 = [head1, ...pronouns1.map((p, i) => [`${t(forms1[i])} @b`, `${formatStr(p)} @`, `${formatStr(data.present[i])} @`, ...(displayImperfect ? [`${formatStr(data.imperfect[i])} @`] : []), `${formatStr(data.future[i])} @`])];

        const head2 = ['&nbsp@bl;bt;w=2', `${t(displayImperfect ? 'perfect' : 'past')} @; b`, ...(displayImperfect ? [`${t('pluperfect')} @; b`] : []), `${t('conditional')} @; b`];
        const pronouns2 = ['ja', 'ty', 'on', 'ona', 'ono', 'my', 'vy', 'oni one'];
        const forms2 = ['1sg', '2sg', '3sg', null, null, '1pl', '2pl', '3pl'];
        const table2 = [head2, ...pronouns2.map((p, i) => {
            const row = [`${formatStr(p)} @`, `${formatStr(data.perfect[i])} @`, ...(displayImperfect ? [`${formatStr(data.pluperfect[i])} @`] : []), `${formatStr(data.conditional[i])} @`];
            if (forms2[i]) {
                let cell = `${t(forms2[i])} @b`;
                if (forms2[i] === '3sg') cell += ';h=3';
                row.unshift(cell);
            }
            return row;
        })];

        const tableAdd = [
            [`${t('infinitive')} @b`, formatStr(data.infinitive)],
            [`${t('imperative')} @b`, formatStr(data.imperative)],
            [`${t('presentActiveParticiple')} @b`, formatStr(data.prap)],
            [`${t('presentPassiveParticiple')} @b`, formatStr(data.prpp)],
            [`${t('pastActiveParticiple')} @b`, formatStr(data.pfap)],
            [`${t('pastPassiveParticiple')} @b`, formatStr(data.pfpp)],
            [`${t('verbalNoun')} @b`, formatStr(data.gerund)],
        ];

        return (
            <>
                <Table data={[...table1, ['@w=2;bb;bl;br', `@w=${displayImperfect ? 3 : 2}; bl; br`], ...table2]} />
                <Table data={tableAdd} />
            </>
        );
    };

    const COLLECTIVE_NUMERALS = new Set(['oba', 'obadva', 'obydva']);
    const renderNumeral = (word, details) => {
        const baseWord = word.trim().split(/[\s,(]/)[0];
        const numeralType = COLLECTIVE_NUMERALS.has(baseWord) ? 'collective' : getNumeralType(details);
        console.log('[renderNumeral] word:', word, 'baseWord:', baseWord, 'numeralType:', numeralType);
        const paradigm = declensionNumeral(word, numeralType);
        console.log('[renderNumeral] paradigm:', paradigm);
        if (!paradigm) return null;
        if (paradigm.type === 'noun') return <Table data={getSimpleCasesTable(paradigm)} />;
        return (
            <>
                <Table data={getAdjectiveSingularCasesTable(paradigm.casesSingular)} />
                <Table data={getAdjectivePluralCasesTable(paradigm.casesPlural)} />
            </>
        );
    };

    const renderPronoun = (word, details) => {
        const paradigm = declensionPronoun(word, getPronounType(details));
        if (!paradigm) return null;
        if (paradigm.type === 'noun') return <Table data={getSimpleCasesTable(paradigm)} />;
        return (
            <>
                <Table data={getAdjectiveSingularCasesTable(paradigm.casesSingular)} />
                <Table data={getAdjectivePluralCasesTable(paradigm.casesPlural)} />
            </>
        );
    };

    const pos = getPartOfSpeech(details);
    const splitted = word.split(',');

    return (
        <div className="result-details result-details--forms">
            {splitted.map((w, i) => (
                <div key={i} className="word-section">
                    {splitted.length > 1 && <h6>{formatStr(w.trim())}</h6>}
                    {pos === 'noun' && renderNoun(w.trim(), add, details)}
                    {pos === 'adjective' && renderAdjective(w.trim(), details)}
                    {pos === 'verb' && renderVerb(w.trim(), add, details)}
                    {pos === 'numeral' && renderNumeral(w.trim(), details)}
                    {pos === 'pronoun' && renderPronoun(w.trim(), details)}
                    {i < splitted.length - 1 && <hr />}
                </div>
            ))}
            <div className="result-details__footer">
                <LineSelector
                    options={alphabetTypes.map((item) => ({ name: t(item.name), value: item.value }))}
                    value={alphabetType}
                    onSelect={onSetAlphabet}
                />
            </div>
        </div>
    );
});

export const ResultDetails: React.FC<IResultDetailsProps> = React.memo(({ item, mode, onCompareChange }) => {
    const dispatch = useDispatch();
    const [compareItems, setCompareItems] = useState<ITranslateResult[]>([]);
    const [compareAlphabets, setCompareAlphabets] = useState<string[]>([]);
    const [comparisonLayout, setComparisonLayout] = useState<'grid' | 'horizontal'>('horizontal');

    const alphabetType = useSelector((state: IMainState) => state.alphabetType);
    const flavorisationType = useSelector((state: IMainState) => state.flavorisationType);
    const dictionaryLanguages = useSelector((state: IMainState) => state.dictionaryLanguages);
    const orderOfCases = useSelector((state: IMainState) => state.orderOfCases);
    const displayImperfect = useSelector((state: IMainState) => state.displayImperfect);

    // Notify parent when comparison state changes
    React.useEffect(() => {
        onCompareChange?.(compareItems.length > 0);
    }, [compareItems.length, onCompareChange]);


    const renderContent = (targetItem: ITranslateResult, itemAlphabetType?: string, onAlphabetChange?: (type: string) => void, itemKey?: string) => {
        if (mode === 'translations') {
            return <ResultTranslations item={targetItem} dictionaryLanguages={dictionaryLanguages} itemKey={itemKey || 'main'} />;
        }

        return (
            <ResultForms
                item={targetItem}
                alphabetType={itemAlphabetType || alphabetType}
                flavorisationType={flavorisationType}
                orderOfCases={orderOfCases}
                displayImperfect={displayImperfect}
                onSetAlphabet={onAlphabetChange || ((type) => dispatch(setAlphabetTypeAction(type as any)))}
                isComparison={compareItems.length > 0}
            />
        );
    };

    const handleAddCompare = (newItem: ITranslateResult | null) => {
        if (newItem && compareItems.length < 3) {
            setCompareItems([...compareItems, newItem]);
            setCompareAlphabets([...compareAlphabets, alphabetType]);
        }
    };

    const handleRemoveCompare = (index: number) => {
        setCompareItems(compareItems.filter((_, i) => i !== index));
        setCompareAlphabets(compareAlphabets.filter((_, i) => i !== index));
    };

    const handleCompareAlphabetChange = (index: number, newAlphabet: string) => {
        const newAlphabets = [...compareAlphabets];
        newAlphabets[index] = newAlphabet;
        setCompareAlphabets(newAlphabets);
    };

    const renderComparisonContent = () => (
        <div className={cn('result-details-compare-columns', `result-details-compare-columns--${comparisonLayout}`, {
            'result-details-compare-columns--single': compareItems.length === 0,
        })}>
            <div className="result-details-column">
                {compareItems.length > 0 && <div className="column-header">{item.original}</div>}
                {renderContent(item, undefined, undefined, 'main')}
            </div>
            {compareItems.map((cItem, idx) => (
                <div className="result-details-column" key={`${cItem.id}-${idx}`}>
                    <div className="column-header">
                        {cItem.original}
                        <button className="column-close" onClick={() => handleRemoveCompare(idx)}>&times;</button>
                    </div>
                    {renderContent(
                        cItem,
                        compareAlphabets[idx],
                        (type) => handleCompareAlphabetChange(idx, type),
                        `compare-${idx}`
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className={compareItems.length > 0 ? 'result-details-compare-wrapper' : ''}>
            {(compareItems.length > 0 || compareItems.length < 3) && (
                <div className="result-details-compare-header">
                    {compareItems.length < 3 && (
                        <CompareSearch
                            onSelect={handleAddCompare}
                            onClear={() => { }}
                            placeholder={compareItems.length > 0 ? t('addWordPlaceholder') : t('compareWithPlaceholder')}
                        />
                    )}
                    {compareItems.length > 0 && (
                        <div className="layout-toggle">
                            <button
                                className="layout-toggle-btn active"
                                onClick={() => setComparisonLayout(comparisonLayout === 'horizontal' ? 'grid' : 'horizontal')}
                                title={comparisonLayout === 'horizontal' ? 'Switch to Grid View' : 'Switch to Horizontal View'}
                            >
                                {comparisonLayout === 'horizontal' ? '↕' : '↔'}
                            </button>
                        </div>
                    )}
                </div>
            )}
            {renderComparisonContent()}
        </div>
    );
});
