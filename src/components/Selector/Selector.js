import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './Selector.scss';
export const Selector = ({ onSelect, options, className, value, label, testId, hideLabel }) => {
    const generatedId = useId();
    const labelId = label ? `selector-label-${generatedId}` : undefined;
    const buttonId = `selector-button-${generatedId}`;
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value) || options[0];
    }, [options, value]);
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);
    useEffect(() => {
        setIsOpen(false);
    }, [value, options]);
    const onNativeSelect = (event) => {
        onSelect(event.currentTarget.value);
    };
    const onTriggerKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(true);
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
        }
    };
    return (_jsxs("div", { ref: wrapperRef, className: classNames('selector', className, {
            'hide-label': hideLabel,
            'is-open': isOpen,
        }), children: [label && _jsx("label", { className: "selector__title", id: labelId, children: label }), _jsxs("div", { className: "selector__control", children: [_jsx("select", { "data-testid": testId, value: selectedOption?.value, className: "selector__native", onChange: onNativeSelect, tabIndex: -1, "aria-hidden": "true", children: options.map((option) => _jsx("option", { value: option.value, children: option.name }, option.name)) }), _jsxs("button", { id: buttonId, type: "button", className: "selector__trigger", "aria-expanded": isOpen, "aria-haspopup": "listbox", "aria-labelledby": labelId ? `${labelId} ${buttonId}` : undefined, onClick: () => setIsOpen((current) => !current), onKeyDown: onTriggerKeyDown, children: [_jsx("span", { className: "selector__text", children: selectedOption?.name }), _jsx("span", { className: "selector__arrow", children: "\u25BE" })] }), _jsx("div", { className: classNames('selector__menu', { active: isOpen }), role: "listbox", "aria-labelledby": labelId || buttonId, children: options.map((option) => (_jsx("button", { type: "button", role: "option", className: classNames('selector__option', {
                        active: option.value === selectedOption?.value,
                    }), "aria-selected": option.value === selectedOption?.value, onClick: () => {
                        onSelect(option.value);
                        setIsOpen(false);
                    }, children: option.name }, option.value))) })] })] }));
};
//# sourceMappingURL=Selector.js.map
