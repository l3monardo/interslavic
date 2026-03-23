import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import './Expand.scss';
import ExpandIcon from './images/expand-icon.svg';
export const Expand = ({ className, isExpanded, onChange, children, }) => (_jsxs("div", { className: classNames(['expand', className], { expanded: isExpanded }), children: [_jsxs("div", { className: "expand__container", children: [...children] }), _jsx("div", { className: "expand__button-wrap", onClick: () => onChange(), children: _jsx("button", { className: "expand__button", id: "expand", type: "button", "aria-label": "Expand", "aria-expanded": isExpanded, children: _jsx(ExpandIcon, {}) }) })] }));
//# sourceMappingURL=Expand.js.map