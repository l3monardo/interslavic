import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './Card.scss';
export const Card = ({ title, id, children, className }) => (_jsxs("div", { className: classNames('card', className), id: id, children: [_jsx("h5", { className: "card__title", children: title }), _jsx("div", { className: "card__body", children: children })] }));
//# sourceMappingURL=Card.js.map