import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './LineSelector.scss';
export const LineSelector = ({ className, options, value, onSelect }) => {
    const index = options.findIndex((item) => (item.value === value));
    const length = options.length;
    return (_jsxs("div", { className: classNames('lineSelector', className), style: { '--length': length, '--index': index }, children: [_jsx("span", { className: "slide" }), options.map((item) => (_jsx("span", { className: classNames('item', { active: value === item.value }), onClick: () => onSelect(item.value), children: item.name }, item.name)))] }));
};
//# sourceMappingURL=LineSelector.js.map