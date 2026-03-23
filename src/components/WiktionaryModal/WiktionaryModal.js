import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './WiktionaryModal.scss';
export const WiktionaryModal = ({ url, word, language, onClose }) => {
    return (_jsx("div", { className: "wiktionary-modal-overlay", onClick: onClose, children: _jsxs("div", { className: "wiktionary-modal", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "wiktionary-modal__header", children: [_jsxs("h3", { children: [language, ": ", _jsx("span", { className: "word", children: word })] }), _jsx("button", { className: "close-button", onClick: onClose, children: "\u00D7" })] }), _jsx("div", { className: "wiktionary-modal__content", children: _jsx("iframe", { src: url, title: `Wiktionary: ${word}`, className: "wiktionary-iframe" }) }), _jsx("div", { className: "wiktionary-modal__footer", children: _jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", children: "Open in new tab \u2192" }) })] }) }));
};
//# sourceMappingURL=WiktionaryModal.js.map