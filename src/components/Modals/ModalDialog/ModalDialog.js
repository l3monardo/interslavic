import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideModalDialog } from 'actions';
import { MODAL_DIALOG_TYPES } from 'reducers';
import { useModalDialog } from 'hooks';
const DetailModal = lazy(() => import('components/Modals/DetailModal'));
const TranslationsModal = lazy(() => import('components/Modals/TranslationsModal'));
const WordErrorModal = lazy(() => import('components/Modals/WordErrorModal'));
import { Spinner } from 'components/Spinner';
import './ModalDialog.scss';
function getModalDialog(type) {
    switch (type) {
        case MODAL_DIALOG_TYPES.MODAL_DIALOG_TRANSLATION:
            return (_jsx(Suspense, { fallback: _jsx(Spinner, { size: "4em", borderWidth: "0.3em" }), children: _jsx(TranslationsModal, {}) }));
        case MODAL_DIALOG_TYPES.MODAL_DIALOG_WORD_FORMS:
            return (_jsx(Suspense, { fallback: _jsx(Spinner, { size: "4em", borderWidth: "0.3em" }), children: _jsx(DetailModal, {}) }));
        case MODAL_DIALOG_TYPES.MODAL_DIALOG_WORD_ERROR:
            return (_jsx(Suspense, { fallback: _jsx(Spinner, { size: "4em", borderWidth: "0.3em" }), children: _jsx(WordErrorModal, {}) }));
        default:
            return null;
    }
}
export const ModalDialog = () => {
    const { type, show } = useModalDialog();
    const content = show ? getModalDialog(type) : null;
    const dispatch = useDispatch();
    const onKeyPress = useCallback(({ code }) => {
        if (code === 'Escape') {
            dispatch(hideModalDialog());
        }
    }, [dispatch]);
    const onBackdropClick = useCallback(() => {
        dispatch(hideModalDialog());
    }, [dispatch]);
    useEffect(() => {
        window.addEventListener('keyup', onKeyPress);
        return () => {
            window.removeEventListener('keyup', onKeyPress);
        };
    }, [onKeyPress]);
    return (_jsxs("div", { className: classNames('modal-dialog-container', { show }), children: [_jsx("div", { className: "modal-dialog-back", onClick: onBackdropClick }), _jsx("dialog", { className: "modal-dialog", children: content })] }));
};
//# sourceMappingURL=ModalDialog.js.map