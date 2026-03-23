import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './Selector.scss';
export const Selector = ({ onSelect, options, className, value, label, testId, hideLabel }) => {
    const id = label ? label.toLowerCase().replace(/ /, '_') : null;
    return (_jsxs("div", { className: classNames('selector', className, { 'hide-label': hideLabel }), children: [label && _jsx("label", { className: "selector__title", htmlFor: id, children: label }), _jsx("select", { "data-testid": testId, id: id, value: value, className: "selector__select", onChange: (e) => onSelect(options[e.currentTarget.selectedIndex].value), children: options.map((option) => _jsx("option", { value: option.value, children: option.name }, option.name)) })] }));
};
//# sourceMappingURL=Selector.js.map