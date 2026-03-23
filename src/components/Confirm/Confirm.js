import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { Button } from 'components';
import './Confirm.scss';
export const Confirm = ({ className, text, okText, cancelText, onConfirm, onCancel, }) => {
    return (_jsxs("div", { className: classNames(['confirm', className]), children: [_jsx("div", { className: "confirm__text", children: text }), _jsxs("div", { className: "confirm__buttons", children: [_jsx(Button, { onClick: onCancel, size: "M", title: cancelText }), _jsx(Button, { onClick: onConfirm, type: "error", size: "M", title: okText })] })] }));
};
//# sourceMappingURL=Confirm.js.map