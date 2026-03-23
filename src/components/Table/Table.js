import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import { Clipboard, Hint, parseStr } from 'components';
import './Table.scss';
export class Table extends Component {
    render() {
        return (_jsx("table", { className: "table", children: _jsx("tbody", { children: this.renderBody() }) }));
    }
    parseItem(raw) {
        // use negative lookahead for @] to avoid splitting by @ inside []
        let [str, rawAttrs, tips] = raw.split(/@(?!])/);
        str = parseStr(str);
        rawAttrs ??= '';
        tips ??= '';
        const attrs = {};
        rawAttrs.split(';').forEach((rawExp) => {
            const exp = rawExp.split('=');
            if (exp.length === 1) {
                exp.push(true);
            }
            attrs[exp[0]] = exp[1];
        });
        return {
            str,
            attrs,
            tips,
        };
    }
    getClassName(attrs) {
        return [
            'custom-text',
            ...Object.keys(attrs).filter((w) => (w !== 'w' && w !== 'h' && w !== 'lang'))
        ].join(' ');
    }
    renderRow(row) {
        return row
            .map((item) => this.parseItem(item))
            .map(({ str, attrs, tips }, i) => {
            if (tips) {
                return (_jsx("td", { className: this.getClassName(attrs), colSpan: attrs.w, rowSpan: attrs.h, style: { width: attrs.sw }, children: _jsx(Hint, { className: "with-tips", shortTitle: str, title: tips }) }, i));
            }
            else if (str.includes('<') || str.includes('&')) {
                return (_jsx("td", { className: this.getClassName(attrs), colSpan: attrs.w, rowSpan: attrs.h, style: { width: attrs.sw }, dangerouslySetInnerHTML: { __html: str } }, i));
            }
            else {
                return (_jsx("td", { className: this.getClassName(attrs), colSpan: attrs.w, rowSpan: attrs.h, style: { width: attrs.sw }, children: _jsx(Clipboard, { str: str, lang: attrs.lang }) }, i));
            }
        });
    }
    renderBody() {
        return this.props.data.map((row, i) => _jsx("tr", { children: this.renderRow(row) }, i));
    }
}
//# sourceMappingURL=Table.js.map