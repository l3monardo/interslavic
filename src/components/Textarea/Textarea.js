import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import './Textarea.scss';
function getLinesHeight(count, size) {
    const sizes = {
        'XS': 16,
        'S': 18,
        'M': 20,
        'L': 14,
    };
    return sizes[size] * count + 8 * 2;
}
export const Textarea = ({ value, error, size = 'M', className, onChange, autoresize, placeholder, ...otherProps }) => {
    const textareaRef = useRef(null);
    const minLines = 2;
    const maxLines = 6;
    const minHeight = getLinesHeight(minLines, size);
    const maxHeight = getLinesHeight(maxLines, size);
    useEffect(() => {
        if (textareaRef && textareaRef.current && autoresize) {
            textareaRef.current.style.height = '';
            const height = Math.min(Math.max(textareaRef.current.scrollHeight, minHeight), maxHeight) + 2;
            textareaRef.current.style.height = `${height}px`;
        }
    }, [value, textareaRef, autoresize]);
    return (_jsxs("div", { className: classNames('textarea', [className], { error: error?.length }), children: [error && (_jsx("p", { className: "textarea__error-text", children: error })), _jsx("textarea", { ref: textareaRef, className: classNames(['textarea__native', size]), placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), ...otherProps })] }));
};
//# sourceMappingURL=Textarea.js.map