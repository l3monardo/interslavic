import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import './Button.scss';
export const Button = ({ size = 'M', href, type = 'primary', target, onClick, title, disabled, fill = true, className, }) => {
    const clsName = classNames(['button', `button-${size}`, type, className], { disabled, fill });
    if (href) {
        return (_jsx("a", { className: clsName, href: href, target: target, onClick: onClick, children: title }));
    }
    return (_jsx("button", { className: clsName, onClick: onClick, disabled: disabled, children: title }));
};
//# sourceMappingURL=Button.js.map