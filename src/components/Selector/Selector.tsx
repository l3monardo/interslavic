import classNames from 'classnames'
import {
    type ChangeEvent,
    type KeyboardEvent,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'

import './Selector.scss'

export interface ISelectorOption {
    name: string;
    value: string;
}

interface ISelectorProps {
    onSelect: (option: string) => void;
    options: ISelectorOption[];
    className?: string;
    value?: string;
    label?: string;
    testId?: string;
    hideLabel?: boolean;
}

export const Selector = ({ onSelect, options, className, value, label, testId, hideLabel }: ISelectorProps) => {
    const generatedId = useId()
    const labelId = label ? `selector-label-${generatedId}` : undefined
    const buttonId = `selector-button-${generatedId}`
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value) || options[0]
    }, [options, value])

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    useEffect(() => {
        setIsOpen(false)
    }, [value, options])

    const onNativeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.currentTarget.value)
    }

    const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsOpen(true)
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            setIsOpen(true)
        }
    }

    return (
        <div
            ref={wrapperRef}
            className={classNames('selector', className, {
                'hide-label': hideLabel,
                'is-open': isOpen,
            })}
        >
            {label && <label className="selector__title" id={labelId}>{label}</label>}
            <div className="selector__control">
                <select
                    data-testid={testId}
                    value={selectedOption?.value}
                    className="selector__native"
                    onChange={onNativeSelect}
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    {options.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                </select>
                <button
                    id={buttonId}
                    type="button"
                    className="selector__trigger"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby={labelId ? `${labelId} ${buttonId}` : undefined}
                    onClick={() => setIsOpen((current) => !current)}
                    onKeyDown={onTriggerKeyDown}
                >
                    <span className="selector__text">{selectedOption?.name}</span>
                    <span className="selector__arrow">▾</span>
                </button>
                <div
                    className={classNames('selector__menu', { active: isOpen })}
                    role="listbox"
                    aria-labelledby={labelId || buttonId}
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            role="option"
                            className={classNames('selector__option', {
                                active: option.value === selectedOption?.value,
                            })}
                            aria-selected={option.value === selectedOption?.value}
                            onClick={() => {
                                onSelect(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
