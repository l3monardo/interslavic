import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { EN, ISV } from 'consts';
import { t } from 'translations';
import { langAction } from 'actions';
import { useDictionaryLanguages, useLang } from 'hooks';
import { Selector } from 'components';
import './LangSelector.scss';
import DirectionIcon from './images/direction-icon.svg';
const LangPart = ({ lang, dir, onSelect }) => {
    const langs = useDictionaryLanguages();
    if (lang === ISV) {
        return (_jsx("div", { className: "lang-selector__isv", children: t('isvLang') }));
    }
    const options = [EN, ...langs].map((value) => ({
        name: t(`${value}Lang`),
        value,
    }));
    return (_jsx(Selector, { testId: "lang-selector", className: "lang-selector__another", label: dir, hideLabel: true, options: options, value: lang, onSelect: (value) => {
            if (dir === 'from') {
                onSelect(value);
            }
            if (dir === 'to') {
                onSelect(value);
            }
        } }));
};
export const LangSelector = () => {
    const { from, to } = useLang();
    const dispatch = useDispatch();
    return (_jsxs("div", { className: "lang-selector", children: [_jsx(LangPart, { dir: "from", lang: from, onSelect: (value) => dispatch(langAction({
                    from: value,
                    to,
                })) }), _jsx("button", { "data-testid": "change-direction", type: "button", "aria-label": "Change translation direction", className: classNames('lang-selector__change-dir-button', { rotate: from === ISV }), onClick: () => dispatch(langAction({
                    from: to,
                    to: from,
                })), children: _jsx(DirectionIcon, {}) }), _jsx(LangPart, { dir: "to", lang: to, onSelect: (value) => dispatch(langAction({
                    from,
                    to: value,
                })) })] }));
};
//# sourceMappingURL=LangSelector.js.map