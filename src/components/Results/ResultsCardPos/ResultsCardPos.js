import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { t } from 'translations';
import { expandAbbr, translateAbbr } from 'utils';
import { Hint } from 'components/Hint';
export const ResultsCardPos = memo(({ details }) => (_jsx(Hint, { title: translateAbbr(t, details), shortTitle: expandAbbr(t, details) })));
ResultsCardPos.displayName = 'ResultsCardPos';
//# sourceMappingURL=ResultsCardPos.js.map