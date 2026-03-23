import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import './Link.scss';
export const Link = ({ href, title, id, external = false, className, onClick, children, }) => {
    const clsName = classNames(['link', className]);
    return (_jsx("a", { className: clsName, href: href, title: title, onClick: onClick, id: id, target: external ? '_blank' : '_self', rel: external ? 'noreferrer' : '', children: children }));
};
//# sourceMappingURL=Link.js.map