export function getPreferredTheme() {
    if (typeof window === 'undefined') {
        return 'light'; // Fallback to default theme
    }
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkTheme ? 'dark' : 'light';
}
//# sourceMappingURL=getPreferredTheme.js.map