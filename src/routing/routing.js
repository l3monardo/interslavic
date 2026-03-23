export const pages = [
    {
        title: 'dictionaryTitle',
        value: 'dictionary',
        path: '/',
    },
    {
        title: 'viewerTitle',
        value: 'viewer',
        path: '/viewer',
        online: true,
    },
    {
        title: 'settingsTitle',
        value: 'settings',
        path: '/settings',
    },
    {
        title: 'aboutTitle',
        value: 'about',
        path: '/about',
    },
];
export const defaultPages = ['dictionary', 'settings', 'about'];
export function goToPage(path) {
    // Navigate RELATIVE to current location if possible, or usually just use state
    // But this app uses pushState with absolute paths.
    // Let's use the current window location to respect the base.
    const baseUrl = window.location.pathname.replace(/\/$/, '')
        .replace(/\/(settings|about|viewer)$/, '');
    // If path is '/', go to baseUrl
    const target = path === '/' ? (baseUrl || '/') : `${baseUrl || ''}${path}`;
    window.history.pushState({}, document.title, target);
}
export function getPageFromPath() {
    const currentPath = window.location.pathname;
    // Check key suffixes
    if (currentPath.endsWith('/settings'))
        return 'settings';
    if (currentPath.endsWith('/about'))
        return 'about';
    if (currentPath.endsWith('/viewer'))
        return 'viewer';
    // Default to dictionary if no known suffix
    return 'dictionary';
}
export function setInitialPage() {
    // No-op or just ensure we are on a valid page?
    // The previous logic forced a replaceState to '/' if not found.
    // We should be careful not to break the subdirectory.
    const page = getPageFromPath();
    // If it is dictionary, do nothing (we are at root or /slovnik/)
}
export function getPathFromPage(page) {
    const finded = pages.find(({ value }) => (value === page));
    if (finded) {
        return finded.path;
    }
    return '/';
}
//# sourceMappingURL=routing.js.map