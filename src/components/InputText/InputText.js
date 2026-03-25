import { useEffect, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './InputText.scss';
export const InputText = ({ value, size = 'M', onChange, placeholder, testId, className, ...otherProps }) => {
    const isSearchPrompt = otherProps.type === 'search' && Boolean(placeholder);
    const [isFocused, setIsFocused] = useState(false);
    const [promptText, setPromptText] = useState(placeholder || '');
    useEffect(() => {
        if (!isSearchPrompt) {
            return;
        }
        if (value?.length) {
            setPromptText('');
            return;
        }
        if (!isFocused) {
            setPromptText(placeholder || '');
            return;
        }
        if (!promptText.length) {
            return;
        }
        const timer = window.setTimeout(() => {
            setPromptText((current) => current.slice(0, -1));
        }, 18);
        return () => window.clearTimeout(timer);
    }, [isFocused, isSearchPrompt, placeholder, promptText, value]);
    return (_jsxs("div", { className: classNames('input-text', `input-text-${size.toLowerCase()}`, className, {
            'input-text--focused': isFocused,
            'input-text--has-value': Boolean(value?.length),
            'input-text--prompt-cleared': isSearchPrompt && isFocused && !value?.length && !promptText.length,
            'input-text--search-prompt': isSearchPrompt,
        }), children: [_jsx("input", { "data-testid": testId, className: "input-text__input", placeholder: isSearchPrompt ? '' : placeholder, value: value, onChange: (e) => onChange(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), ...otherProps }), isSearchPrompt && !value?.length && (_jsxs("div", { className: "input-text__prompt", "aria-hidden": "true", children: [_jsx("span", { className: "input-text__prompt-icon", children: "\uD83D\uDD0D" }), _jsx("span", { className: "input-text__prompt-text", children: promptText })] })), _jsx("button", { className: "input-text__clear-button", type: "reset", "aria-label": "Clear input", disabled: value.length === 0, onClick: () => onChange(''), children: "\u00D7" })] }));
};
//# sourceMappingURL=InputText.js.map
