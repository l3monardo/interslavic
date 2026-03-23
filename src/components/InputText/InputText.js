import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './InputText.scss';
export const InputText = ({ value, size = 'M', onChange, placeholder, testId, className, ...otherProps }) => {
    return (_jsxs("div", { className: classNames('input-text', `input-text-${size.toLowerCase()}`, className), children: [_jsx("input", { "data-testid": testId, className: "input-text__input", placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), ...otherProps }), _jsx("button", { className: "input-text__clear-button", type: "reset", "aria-label": "Clear input", disabled: value.length === 0, onClick: () => onChange(''), children: "\u00D7" })] }));
};
//# sourceMappingURL=InputText.js.map