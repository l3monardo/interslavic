import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './Checkbox.scss';
import CheckedIcon from './images/checked-icon.svg';
import PartCheckedIcon from './images/part-checked-icon.svg';
export const Checkbox = ({ className, title, checked, onChange, disabled, part }) => {
    const id = `id_${title.toLowerCase()}`;
    return (_jsxs("div", { className: classNames('checkbox', className, { disabled, checked }), children: [_jsx("input", { onChange: onChange, type: "checkbox", className: "checkbox__input", id: id, checked: checked }), _jsx("span", { className: "checkbox__box", onClick: onChange, children: _jsxs("span", { className: "checkbox__icon", children: [!part && _jsx(CheckedIcon, {}), part && _jsx(PartCheckedIcon, {})] }) }), _jsx("label", { className: "checkbox__label", htmlFor: id, children: title })] }));
};
//# sourceMappingURL=Checkbox.js.map