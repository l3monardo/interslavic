import { getPreferredTheme } from './getPreferredTheme';
describe('getPreferredTheme', () => {
    let originalWindow;
    beforeEach(() => {
        originalWindow = global['window'];
        delete global['window'];
    });
    afterEach(() => {
        global['window'] = originalWindow;
    });
    it('should return "dark" when prefers dark theme', () => {
        global['window'] = { matchMedia: jest.fn(() => ({ matches: true })) };
        expect(getPreferredTheme()).toBe('dark');
    });
    it('should return "light" when prefers light theme', () => {
        global['window'] = { matchMedia: jest.fn(() => ({ matches: false })) };
        expect(getPreferredTheme()).toBe('light');
    });
    it('should return "light" when window is not defined', () => {
        global['window'] = undefined;
        expect(getPreferredTheme()).toBe('light');
    });
});
//# sourceMappingURL=getPreferredTheme.test.js.map