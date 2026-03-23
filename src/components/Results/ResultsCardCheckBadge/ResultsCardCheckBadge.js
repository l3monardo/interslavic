import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import { t } from 'translations';
import './ResultsCardCheckBadge.scss';
export const ResultsCardCheckBadge = ({ item, short }) => {
    if (!item.checked) {
        return (_jsx("div", { className: cn('results-card-check-badge', { verified: item.checked, short }), children: !short && (item.checked ? t('verified') : t('autoTranslation')) }));
    }
};
//# sourceMappingURL=ResultsCardCheckBadge.js.map