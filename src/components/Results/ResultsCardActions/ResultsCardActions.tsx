import cn from 'classnames'
import { useDispatch } from 'react-redux'

import { t } from 'translations'

import { setNotificationAction, showModalDialog } from 'actions'
import { MODAL_DIALOG_TYPES } from 'reducers'

import { Dictionary, ITranslateResult } from 'services'

import {
    useLang,
} from 'hooks'
import {
    getPartOfSpeech,
    toQueryString,
    wordHasForms,
} from 'utils'

import './ResultsCardActions.scss'

import ErrorIcon from './images/error-icon.svg'
import FormsIcon from './images/forms-icon.svg'
import ShareIcon from './images/share-icon.svg'
import TranslationsIcon from './images/translations-icon.svg'

interface IResultsCardActionsProps {
    item: ITranslateResult;
    short: boolean;
    activeTab: 'forms' | 'translations' | 'none';
    onToggleTab: (tab: 'forms' | 'translations') => void;
}

export const ResultsCardActions = ({ item, short, activeTab, onToggleTab }: IResultsCardActionsProps) => {
    const pos = getPartOfSpeech(item.details)
    const dispatch = useDispatch()
    const lang = useLang()

    const showWordErrorModal = () => {
        dispatch(showModalDialog({
            type: MODAL_DIALOG_TYPES.MODAL_DIALOG_WORD_ERROR,
            data: {
                wordId: item.id,
                isvWord: item.original,
                translatedWord: item.translate,
            },
        }))
    }

    const shareWord = () => {
        const { origin, pathname } = window.location
        const query = toQueryString({
            text: `id${item.id}`,
            lang: `${lang.from}-${lang.to}`,
        })

        const url = `${origin}${pathname}?${query}`

        if (navigator.share) {
            navigator.share({
                url,
            })
        } else {
            navigator.clipboard.writeText(url).then(() => {
                const notificationText = t('wordLinkCopied', {
                    str: url,
                })
                dispatch(setNotificationAction({ text: notificationText }))
            })
        }
    }

    return (
        <div className={cn('results-card-actions', { short })}>
            <button
                className="action-button"
                type="button"
                aria-label={t('shareWord')}
                onClick={shareWord}
            >
                {short ? <ShareIcon /> : t('shareWord')}
            </button>
            <button
                className="action-button"
                type="button"
                aria-label={t('reportWordError')}
                onClick={showWordErrorModal}
            >
                {short ? <ErrorIcon /> : t('reportWordError')}
            </button>
            <button
                className={cn('action-button', { active: activeTab === 'translations' })}
                type="button"
                aria-label={t('translates')}
                onClick={() => onToggleTab('translations')}
            >
                {short ? <TranslationsIcon /> : t('translates')}
            </button>
            {wordHasForms(item.original, item.details) && (
                <button
                    className={cn('action-button', { active: activeTab === 'forms' })}
                    type="button"
                    aria-label={t('declensions')}
                    onClick={() => onToggleTab('forms')}
                >
                    {short ? (
                        <FormsIcon />
                    ) : (
                        pos === 'verb' ? t('conjugation') : t('declensions')
                    )}
                </button>
            )}
        </div>
    )
}
