import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import { t } from 'translations';
import { posFilterAction } from 'actions';
import './ResultsEmpty.scss';
export const ResultsEmpty = ({ showReset }) => {
    const dispatch = useDispatch();
    return (_jsxs("div", { className: "results-empty", "data-testid": "result-empty", children: [t('resultsNotFound'), " ", _jsx("span", { className: "results-empty__smile", children: ":(" }), _jsx("div", { className: "results-empty__filter", children: t(showReset ? 'resultsNotFoundMessageFilters' : 'resultsNotFoundMessage') }), showReset && (_jsx("button", { type: "button", className: "results-empty__button", "aria-label": "Reset filters", onClick: () => dispatch(posFilterAction('')), children: t('resultsNotFoundResetFilters') }))] }));
};
//# sourceMappingURL=ResultsEmpty.js.map