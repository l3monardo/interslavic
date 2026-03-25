import { useEffect, useState } from 'react'

import classNames from 'classnames'

import './InputText.scss'

interface IInputTextProps {
    value?: string;
    size?: 'S' | 'M' | 'L';
    onChange: (value: string) => void;
    placeholder?: string;
    testId?: string;

    [x: string]: any;
}

export const InputText = ({ value, size = 'M', onChange, placeholder, testId, className, ...otherProps }: IInputTextProps) => {
    const isSearchPrompt = otherProps.type === 'search' && Boolean(placeholder)
    const [isFocused, setIsFocused] = useState(false)
    const [promptText, setPromptText] = useState(placeholder || '')

    useEffect(() => {
        if (!isSearchPrompt) {
            return
        }

        if (value?.length) {
            setPromptText('')
            return
        }

        if (!isFocused) {
            setPromptText(placeholder || '')
            return
        }

        if (!promptText.length) {
            return
        }

        const timer = window.setTimeout(() => {
            setPromptText((current) => current.slice(0, -1))
        }, 18)

        return () => window.clearTimeout(timer)
    }, [isFocused, isSearchPrompt, placeholder, promptText, value])

    return (
        <div
            className={classNames('input-text', `input-text-${size.toLowerCase()}`, className, {
                'input-text--focused': isFocused,
                'input-text--has-value': Boolean(value?.length),
                'input-text--prompt-cleared': isSearchPrompt && isFocused && !value?.length && !promptText.length,
                'input-text--search-prompt': isSearchPrompt,
            })}
        >
            <input
                data-testid={testId}
                className="input-text__input"
                placeholder={isSearchPrompt ? '' : placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...otherProps}
            />
            {isSearchPrompt && !value?.length && (
                <div className="input-text__prompt" aria-hidden="true">
                    <span className="input-text__prompt-icon">🔍</span>
                    <span className="input-text__prompt-text">{promptText}</span>
                </div>
            )}
            <button
                className="input-text__clear-button"
                type="reset"
                aria-label="Clear input"
                disabled={value.length === 0}
                onClick={() => onChange('')}
            >
                &times;
            </button>
        </div>
    )
}
