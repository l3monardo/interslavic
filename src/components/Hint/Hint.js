import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Hint.scss';
export const Hint = ({ title, shortTitle, className, hideTimeout = 1500, }) => {
    const anchorRef = useRef(null);
    const hintRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const anchorRect = anchorRef?.current?.getBoundingClientRect();
    const hintRect = hintRef?.current?.getBoundingClientRect();
    const hideElement = () => {
        setVisible(false);
    };
    useEffect(() => {
        document.addEventListener('click', hideElement, true);
        return () => document.removeEventListener('click', hideElement, true);
    }, []);
    useEffect(() => {
        if (show) {
            setVisible(true);
        }
    }, [show]);
    return (_jsxs("span", { ref: anchorRef, className: cn('hint', className), onClick: () => {
            setShow(true);
            setTimeout(hideElement, hideTimeout);
        }, children: [shortTitle, show && createPortal((_jsx("span", { ref: hintRef, className: cn('hint-global', { visible }), style: {
                    top: anchorRect?.top,
                    left: ((anchorRect?.left + hintRect?.width > window.screen.width) ?
                        (window.screen.width - hintRect?.width - 16) : anchorRect?.left),
                }, onTransitionEnd: () => {
                    if (!visible) {
                        setShow(false);
                    }
                }, children: title })), document.getElementById('app'))] }));
};
//# sourceMappingURL=Hint.js.map