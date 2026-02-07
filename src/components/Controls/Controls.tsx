import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { t } from 'translations'

import { fromTextAction, setSearchExpand } from 'actions'

import {
    useFromText,
    useLang,
    useSearchExpanded,
    useShortCardView,
} from 'hooks'
import { toBCP47 } from 'utils'

import {
    Expand,
    FlavorisationSelector,
    InputText,
    LangSelector,
    POSSelector,
    SearchTypeSelector,
} from 'components'

import './Controls.scss'

interface IControlsProps {
    expanded?: boolean;
}

export const Controls =
    ({ expanded }: IControlsProps) => {
        const dispatch = useDispatch()
        const expand = useSearchExpanded() || expanded
        const short = useShortCardView()

        const lang = useLang()
        const fromText = useFromText()
        const [inputValue, setInputValue] = useState(fromText)

        // Sync local input with global state (e.g. from URL or popstate)
        useEffect(() => {
            setInputValue(fromText)
        }, [fromText])

        useEffect(() => {
            if (inputValue === fromText) return

            const timer = setTimeout(() => {
                dispatch(fromTextAction(inputValue))
            }, 200)

            return () => clearTimeout(timer)
        }, [inputValue, fromText, dispatch])

        const onChange = useCallback((value) => {
            setInputValue(value)
        }, [])

        const spellCheck = lang.from !== 'isv'
        const searchLanguage = toBCP47(lang.from)

        const onChangeExpand = () => dispatch(setSearchExpand(!expand))

        return (
            <div
                className={classNames('controls', { short })}
            >
                <LangSelector />
                <InputText
                    testId="search-input"
                    size="L"
                    value={inputValue}
                    onChange={onChange}
                    placeholder={t('typeWordLabel')}
                    type="search"
                    lang={searchLanguage}
                    autoCapitalize="false"
                    autoComplete={spellCheck ? 'true' : 'false'}
                    autoCorrect={spellCheck ? 'true' : 'false'}
                    spellCheck={spellCheck}
                />
                <Expand
                    isExpanded={expand}
                    onChange={onChangeExpand}
                >
                    <SearchTypeSelector key="searchType" />
                    <FlavorisationSelector key="flavorisation" />
                    <POSSelector key="posFilter" />
                </Expand>
            </div>
        )
    }
