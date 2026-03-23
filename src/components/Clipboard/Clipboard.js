import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { t } from 'translations';
import { setNotificationAction } from 'actions';
import './Clipboard.scss';
export const Clipboard = ({ str, className, lang }) => {
    const dispatch = useDispatch();
    const onClick = () => {
        navigator.clipboard.writeText(str).then(() => {
            const notificationText = t('clipboardCopyNotification', { str });
            dispatch(setNotificationAction({ text: notificationText }));
        });
    };
    return (_jsx("span", { onClick: onClick, className: classNames('clipboard', className), lang: lang, children: str }));
};
//# sourceMappingURL=Clipboard.js.map