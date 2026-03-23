import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useState } from 'react';
import { t } from 'translations';
import { useLoading } from 'hooks';
import { Spinner } from 'components';
import './Loader.scss';
export const Loader = () => {
    const loading = useLoading();
    const [visible, setVisible] = useState(true);
    if (!visible) {
        return null;
    }
    return (_jsxs("div", { className: classNames('loader', { loading }), onTransitionEnd: () => setVisible(false), children: [_jsx(Spinner, { size: "4rem", borderWidth: ".3em" }), _jsx("span", { className: "loader__title", "data-testid": "dictionary-loading", children: t('loading') })] }));
};
//# sourceMappingURL=Loader.js.map