import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageAction } from 'actions';
import { useInterfaceLang, useLoading, usePage } from 'hooks';
import { getPageFromPath, getPathFromPage } from 'routing';
import { toBCP47 } from 'utils';
import { Spinner } from 'components';
import './Router.scss';
const Grammar = lazy(() => import('components/Pages/Grammar'));
const Viewer = lazy(() => import('components/Pages/Viewer'));
const About = lazy(() => import('components/Pages/About'));
const DictionaryPage = lazy(() => import('components/Pages/DictionaryPage'));
const Settings = lazy(() => import('components/Pages/Settings'));
const PageLoader = () => {
    const loading = useRef(useLoading());
    if (loading.current) {
        return;
    }
    return (_jsx("div", { style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }, children: _jsx(Spinner, { size: "4em", borderWidth: "0.3em" }) }));
};
function renderPageContent(page) {
    switch (page) {
        case 'grammar':
            return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Grammar, {}) }));
        case 'dictionary':
            return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(DictionaryPage, {}) }));
        case 'viewer':
            return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Viewer, {}) }));
        case 'settings':
            return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Settings, {}) }));
        case 'about':
            return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(About, {}) }));
    }
}
export const Router = () => {
    const dispatch = useDispatch();
    const interfaceLang = useInterfaceLang();
    const page = usePage();
    const [prevPage, setPrevPage] = useState(page);
    const addClass = page !== prevPage ? 'hide' : 'show';
    const onTransitionEnd = () => {
        if (page !== prevPage) {
            setPrevPage(page);
        }
    };
    const onChangeUrl = () => {
        const currentPage = getPageFromPath();
        if (getPathFromPage(page) !== `/${currentPage}`) {
            dispatch(setPageAction(currentPage));
        }
    };
    useEffect(() => {
        window.onpopstate = onChangeUrl;
    }, [onChangeUrl]);
    useEffect(() => {
        let timeout;
        if (page !== prevPage) {
            // Fallback: if transition doesn't end within 400ms, force update
            timeout = setTimeout(() => {
                setPrevPage(page);
            }, 400);
        }
        return () => clearTimeout(timeout);
    }, [page, prevPage]);
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = toBCP47(interfaceLang);
        }
    }, [interfaceLang]);
    return (_jsx("main", { className: `animation-container ${addClass} ${prevPage}Route`, onTransitionEnd: onTransitionEnd, children: renderPageContent(prevPage) }));
};
//# sourceMappingURL=Router.js.map