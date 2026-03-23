import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { t } from 'translations';
import { setPageAction, fromTextAction, runSearch } from 'actions';
import { useBadges, useEnabledPages, useInterfaceLang, usePage, } from 'hooks';
import { defaultPages, pages } from 'routing';
import './Header.scss';
import LogoIcon from './images/logo-icon.svg';
export const Header = ({ isEmbed }) => {
    useInterfaceLang();
    const dispatch = useDispatch();
    const page = usePage();
    const badges = useBadges();
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [menuAnim, setMenuAnim] = useState(false);
    const collapseMenu = useCallback(() => setMenuIsVisible(false), [setMenuIsVisible]);
    const enabledPages = useEnabledPages();
    const navRef = useRef();
    const logoRef = useRef();
    const navRefWidth = useRef(0);
    const onResize = useCallback(() => {
        if (navRef && navRef.current && logoRef && logoRef.current) {
            const windowWidth = document.body.clientWidth;
            const logoWidth = logoRef.current.getBoundingClientRect().width;
            if (!navRefWidth.current) {
                navRefWidth.current = navRef.current.getBoundingClientRect().width;
            }
            const full = windowWidth > 1052;
            const mobile = !full && ((logoWidth + navRefWidth.current + 20) > windowWidth);
            setMobile(mobile);
        }
    }, [navRef, logoRef]);
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [onResize]);
    useEffect(() => {
        onResize();
    }, [navRef, logoRef, enabledPages, onResize]);
    const filteredPages = useMemo(() => (pages.filter(({ value }) => (defaultPages.includes(value) || enabledPages.includes(value)))), [pages, enabledPages]);
    const showBadges = useMemo(() => (filteredPages.some(({ value }) => (badges.includes(value)))), [badges, filteredPages]);
    if (isEmbed) {
        return (_jsxs("header", { className: classNames('header', 'embed-mode'), children: [_jsx("div", { className: "logo-img", onClick: () => {
                        dispatch(fromTextAction(''));
                        dispatch(runSearch());
                        dispatch(setPageAction('dictionary'));
                    }, style: { cursor: 'pointer', display: 'flex', alignItems: 'center' }, children: _jsx(LogoIcon, { style: { width: 20, height: 20 } }) }), _jsxs("nav", { className: "menu active always-visible", children: [_jsx(MenuItem, { title: "settingsTitle", value: "settings", active: page === 'settings', onClick: () => { } }), _jsx(MenuItem, { title: "aboutTitle", value: "about", active: page === 'about', onClick: () => { } })] })] }));
    }
    return (_jsxs("header", { className: classNames('header', { active: menuIsVisible, mobile }), children: [_jsxs("h1", { className: "logo", ref: logoRef, children: [_jsx("span", { className: "logo-img", onClick: () => {
                            dispatch(fromTextAction(''));
                            dispatch(runSearch());
                            dispatch(setPageAction('dictionary'));
                            setMenuIsVisible(false);
                        }, children: _jsx(LogoIcon, {}) }), _jsx("a", { href: "https://interslavic.forum", target: "_blank", rel: "noopener noreferrer", className: "logo-text", "data-testid": "main-title", children: "interslavic.forum" })] }), _jsx("button", { type: "button", className: classNames('show-menu-button', { 'expanded': menuIsVisible, 'badge': showBadges }), "aria-label": "Menu button", onClick: () => {
                    setMenuIsVisible(!menuIsVisible);
                    setMenuAnim(true);
                }, children: _jsx("span", { className: classNames('lines', { active: menuIsVisible }) }) }), _jsx("nav", { className: classNames('menu', { active: menuIsVisible, anim: menuAnim }), ref: navRef, children: filteredPages.map((({ title, value, subTitle }) => (_jsx(MenuItem, { title: title, subTitle: subTitle, value: value, active: page === value, hasBadge: badges.includes(value), onClick: collapseMenu }, value)))) })] }));
};
const MenuItem = ({ title, subTitle, value, active, onClick: customOnClick, hasBadge, }) => {
    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(setPageAction(value));
        customOnClick();
    };
    return (_jsx("a", { className: classNames('menu-item', { active, 'badge': hasBadge }), onClick: onClick, "data-sub-title": subTitle, href: `/${value}`, children: t(title) }));
};
//# sourceMappingURL=Header.js.map