import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { t } from 'translations';
import './OfflinePlaceholder.scss';
import CrossedCLoudIcon from './images/crossed-cloud-icon.svg';
export const OfflinePlaceholder = ({ className, onClick }) => (_jsxs("div", { className: classNames('offline-placeholder', className), onClick: onClick, children: [_jsx(CrossedCLoudIcon, {}), _jsx("h4", { children: t('offline-title') }), _jsx("h5", { children: t('offline-message') })] }));
//# sourceMappingURL=OfflinePlaceholder.js.map