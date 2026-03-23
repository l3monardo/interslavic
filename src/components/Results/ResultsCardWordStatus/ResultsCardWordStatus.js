import { jsx as _jsx } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import { t } from 'translations';
import { showModalDialog } from 'actions';
import { MODAL_DIALOG_TYPES } from 'reducers';
import { getWordStatus } from 'utils/getWordStatus';
import './ResultsCardWordStatus.scss';
export const ResultsCardWordStatus = ({ item }) => {
    const wordStatus = getWordStatus(item);
    const dispatch = useDispatch();
    const showTranslations = () => {
        dispatch(showModalDialog({
            type: MODAL_DIALOG_TYPES.MODAL_DIALOG_TRANSLATION,
            data: { id: item.id },
        }));
    };
    if (wordStatus) {
        return (_jsx("button", { onClick: showTranslations, className: "results-card-status", title: t(wordStatus.text), children: wordStatus.icon }, "wordStatus"));
    }
};
//# sourceMappingURL=ResultsCardWordStatus.js.map