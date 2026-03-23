import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoadingAction, runSearch } from 'actions';
import { fetchDictionary } from 'services';
import { useColorTheme, useDictionaryLanguages } from 'hooks';
import { Header, Loader, ModalDialog, Notification, Router, } from 'components';
import './Main.scss';
export const Main = () => {
    const dispatch = useDispatch();
    const dictionaryLanguages = useDictionaryLanguages();
    const theme = useColorTheme();
    useLayoutEffect(() => {
        document.body.className = `color-theme--${theme}`;
    }, [theme]);
    useEffect(() => {
        fetchDictionary(dictionaryLanguages).then(() => {
            dispatch(isLoadingAction(false));
            dispatch(runSearch());
        });
    }, [dictionaryLanguages]);
    const isEmbed = new URLSearchParams(window.location.search).get('mode') === 'embed';
    useEffect(() => {
        if (isEmbed) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const height = entry.target.scrollHeight;
                    window.parent.postMessage({ type: 'interslavic-dictionary-height', height }, '*');
                }
            });
            const appElement = document.getElementById('app');
            if (appElement) {
                observer.observe(appElement);
            }
            return () => observer.disconnect();
        }
    }, [isEmbed]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, { isEmbed: isEmbed }), _jsx(Router, {}), _jsx(Loader, {}), _jsx(ModalDialog, {}), _jsx(Notification, {})] }));
};
//# sourceMappingURL=Main.js.map