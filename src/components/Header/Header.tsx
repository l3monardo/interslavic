import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { t } from 'translations'

import { fromTextAction, runSearch, setPageAction } from 'actions'

import {
    useBadges,
    useEnabledPages,
    useInterfaceLang,
    usePage,
} from 'hooks'
import { defaultPages, pages } from 'routing'

import './Header.scss'

import LogoIcon from './images/logo-icon.svg'

interface IHeaderProps {
    isEmbed?: boolean
}

const FORUM_URL = 'https://interslavic.forum'

const ICONS: Record<string, string> = {
    dictionary: '📖',
    viewer: '📋',
    settings: '⚙️',
    about: '❓',
    contribute: '🤝',
    grammar: '📚',
}

export const Header =
    ({ isEmbed }: IHeaderProps) => {
        useInterfaceLang()

        const dispatch = useDispatch()
        const page = usePage()
        const badges = useBadges()
        const [menuIsVisible, setMenuIsVisible] = useState(false)
        const [mobile, setMobile] = useState(false)
        const [menuAnim, setMenuAnim] = useState(false)
        const [logoExpanded, setLogoExpanded] = useState(false)
        const [touchMode, setTouchMode] = useState(false)
        const collapseMenu = useCallback(() => setMenuIsVisible(false), [setMenuIsVisible])
        const enabledPages = useEnabledPages()
        const navRef = useRef<HTMLDivElement | null>(null)
        const logoRef = useRef<HTMLDivElement | null>(null)
        const navRefWidth = useRef<number>(0)

        const onResize = useCallback(() => {
            if (navRef && navRef.current && logoRef && logoRef.current) {
                const windowWidth = document.body.clientWidth
                const logoWidth = logoRef.current.getBoundingClientRect().width

                if (!navRefWidth.current) {
                    navRefWidth.current = navRef.current.getBoundingClientRect().width
                }

                const full = windowWidth > 1052
                const mobile = !full && ((logoWidth + navRefWidth.current + 20) > windowWidth)

                setMobile(mobile)
            }
        }, [navRef, logoRef])

        useEffect(() => {
            window.addEventListener('resize', onResize)

            return () => {
                window.removeEventListener('resize', onResize)
            }
        }, [onResize])

        useEffect(() => {
            onResize()
        }, [navRef, logoRef, enabledPages, onResize])

        useEffect(() => {
            const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
            const updateTouchMode = () => {
                const nextTouchMode = mediaQuery.matches
                setTouchMode(nextTouchMode)

                if (!nextTouchMode) {
                    setLogoExpanded(false)
                }
            }

            updateTouchMode()

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', updateTouchMode)

                return () => {
                    mediaQuery.removeEventListener('change', updateTouchMode)
                }
            }

            mediaQuery.addListener(updateTouchMode)

            return () => {
                mediaQuery.removeListener(updateTouchMode)
            }
        }, [])

        const filteredPages = useMemo(() => (
            pages.filter(({ value }) => {
                if (value === 'grammar') return false // Explicitly hide grammar as requested
                
                return (defaultPages.includes(value) || enabledPages.includes(value))
            })
        ), [pages, enabledPages])

        const showBadges = useMemo(() => (
            filteredPages.some(({ value }) => (badges.includes(value)))
        ), [badges, filteredPages])

        const activePageData = useMemo(() => {
            return pages.find(({ value }) => value === page) || pages[0]
        }, [page])

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (navRef.current && !navRef.current.contains(event.target as Node)) {
                    setMenuIsVisible(false)
                }
            }
            document.addEventListener('mousedown', handleClickOutside)
            
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }, [navRef])

        const onLogoClick = () => {
            dispatch(fromTextAction(''))
            dispatch(runSearch())
            dispatch(setPageAction('dictionary'))
            setMenuIsVisible(false)
        }

        const onLogoFlagClick = () => {
            if (touchMode) {
                setLogoExpanded((current) => !current)
                
                return
            }

            onLogoClick()
        }

        if (isEmbed) {
            return (
                <header className={classNames('header', 'embed-mode')}>
                    <div
                        className="logo-img"
                        onClick={onLogoClick}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <LogoIcon style={{ width: 20, height: 20 }} />
                    </div>
                    <nav className="menu active always-visible">
                        <MenuItem
                            title="settingsTitle"
                            value="settings"
                            active={page === 'settings'}
                            onClick={() => { }}
                        />
                        <MenuItem
                            title="aboutTitle"
                            value="about"
                            active={page === 'about'}
                            onClick={() => { }}
                        />
                    </nav>
                </header>
            )
        }

        return (
            <header
                className={classNames('header', { active: menuIsVisible, mobile })}
            >
                <div
                    className={classNames('logo-button', {
                        active: page === 'dictionary',
                        expanded: logoExpanded,
                        'touch-mode': touchMode,
                    })}
                    ref={logoRef}
                >
                    <button
                        type="button"
                        className="logo-flag"
                        onClick={onLogoFlagClick}
                        aria-expanded={touchMode ? logoExpanded : undefined}
                        aria-label={touchMode ? 'Toggle interslavic.forum link' : 'Go to dictionary'}
                    >
                        <span className="logo-img">
                            <LogoIcon />
                        </span>
                    </button>
                    <a
                        className="logo-text-link"
                        href={FORUM_URL}
                        aria-label="Open interslavic.forum"
                    >
                        <span className="logo-text">interslavic.forum</span>
                    </a>
                </div>
                <div className="nav-dropdown" ref={navRef as any}>
                    {page !== 'dictionary' && (
                        <button
                            type="button"
                            className="back-arrow-button"
                            onClick={onLogoClick}
                            aria-label="Back to Dictionary"
                            title="Back to Dictionary"
                        >
                            ←
                        </button>
                    )}
                    <button
                        type="button"
                        className={classNames('dropdown-trigger', { 'expanded': menuIsVisible, 'badge': showBadges })}

                        onClick={() => {
                            setMenuIsVisible(!menuIsVisible)
                            setMenuAnim(true)
                        }}
                    >
                        <span className="dropdown-trigger-icon">{ICONS[activePageData.value] || ''}</span>
                        <span className="dropdown-trigger-text">{t(activePageData.title)}</span>
                        <span className="dropdown-trigger-arrow">▾</span>
                    </button>
                    <nav className={classNames('menu', { active: menuIsVisible, anim: menuAnim })}>
                        {filteredPages.map((({ title, value, subTitle }) => (
                            <MenuItem
                                key={value}
                                title={title}
                                subTitle={subTitle}
                                value={value}
                                active={page === value}
                                hasBadge={badges.includes(value)}
                                onClick={collapseMenu}
                            />
                        )))}
                    </nav>
                </div>
            </header>
        )
    }

interface IMenuItemProps {
    title: string;
    subTitle?: string;
    value: string;
    hasBadge?: boolean;
    active: boolean;
    onClick: () => void;
}

const MenuItem = ({
    title,
    subTitle,
    value,
    active,
    onClick: customOnClick,
    hasBadge,
}: IMenuItemProps) => {
    const dispatch = useDispatch()
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        dispatch(setPageAction(value))
        customOnClick()
    }

    return (
        <a
            className={classNames('menu-item', { active, 'badge': hasBadge })}
            onClick={onClick}
            data-sub-title={subTitle}
            href={`/${value}`}
        >
            <span className="menu-item-icon">{ICONS[value] || ''}</span>
            <span className="menu-item-text">{t(title)}</span>
        </a>
    )
}
