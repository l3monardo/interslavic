import React, { useState } from 'react'
import cn from 'classnames'

import { IAlphabets } from 'reducers'

import { ITranslateResult } from 'services'

import {
    Clipboard,
    ResultsCardActions,
    ResultsCardCheckBadge,
    ResultsCardOriginal,
    ResultsCardPos,
    ResultsCardWordStatus,
    ResultDetails,
} from 'components'

import './ResultsCard.scss'

interface IResultsCardProps {
    item: ITranslateResult;
    alphabets: IAlphabets;
    caseQuestions: boolean;
    short: boolean;
    index: number;
}

export const ResultsCard =
    React.memo(({ item, alphabets, caseQuestions, short, index }: IResultsCardProps) => {
        const [activeTab, setActiveTab] = useState<'forms' | 'translations' | 'none'>('none');
        const [isComparing, setIsComparing] = useState(false);

        const handleToggleTab = (tab: 'forms' | 'translations') => {
            setActiveTab(prev => prev === tab ? 'none' : tab);
        };

        const isCollectiveOverride = (() => {
            const base = item.isv.split(',')[0].trim();
            return (base === 'oba' || base === 'obadva' || base === 'obydva') && /num\.\s*card\./.test(item.details);
        })();
        const details = isCollectiveOverride
            ? item.details.replace(/num\.\s*card\./g, 'num.coll.')
            : item.details;

        return (
            <div
                className={cn('results-card', { short, expanded: activeTab !== 'none', comparing: isComparing })}
                tabIndex={index}
                data-testid={`result-${index}`}
            >
                <div className="results-card__main">
                    <div className="results-card__text translate">
                        {item.to !== 'isv' ? (
                            <Clipboard str={item.translate} lang={item.to} />
                        ) : (
                            <ResultsCardOriginal
                                item={item}
                                alphabets={alphabets}
                                caseQuestions={caseQuestions}
                                short={short}
                            />
                        )}
                        <ResultsCardWordStatus item={item} />
                        {item.to === 'isv' && short && (
                            <ResultsCardPos details={details} />
                        )}
                    </div>
                    {!short && (
                        <ResultsCardPos details={details} />
                    )}
                    <div className="results-card__bottom">
                        <div className="results-card__text original">
                            {item.to === 'isv' ? (
                                <Clipboard str={item.translate} lang={item.from} />
                            ) : (
                                <ResultsCardOriginal
                                    item={item}
                                    alphabets={alphabets}
                                    caseQuestions={caseQuestions}
                                    short={short}
                                />
                            )}
                            {item.to !== 'isv' && short && (
                                <ResultsCardPos details={details} />
                            )}
                        </div>
                        <ResultsCardActions
                            item={item}
                            short={short}
                            activeTab={activeTab}
                            onToggleTab={handleToggleTab}
                        />
                    </div>
                </div>
                {activeTab !== 'none' && (
                    <div className="results-card__details">
                        <ResultDetails item={item} mode={activeTab as any} onCompareChange={setIsComparing} />
                    </div>
                )}
                <ResultsCardCheckBadge item={item} short={short} />
            </div>
        )
    });
