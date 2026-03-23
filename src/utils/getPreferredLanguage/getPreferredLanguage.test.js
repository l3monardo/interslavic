import { getPreferredLanguage } from './getPreferredLanguage';
describe('getPreferredLanguage', () => {
    it('should fall back to en (#1)', () => {
        expect(getPreferredLanguage()).toBe('en');
    });
    it('should fall back to en (#2)', () => {
        global['navigator'] = {};
        expect(getPreferredLanguage()).toBe('en');
    });
    it('should fall back to en (#3)', () => {
        global['navigator'] = { languages: ['unknown-lang'] };
        expect(getPreferredLanguage()).toBe('en');
    });
    it('should pick first matching language (#1)', () => {
        global['navigator'] = { languages: ['bg', 'en'] };
        expect(getPreferredLanguage()).toBe('bg');
    });
    it('should pick first matching language (#2)', () => {
        global['navigator'] = { languages: ['uk-UA', 'bg-BG', 'en-US'] };
        expect(getPreferredLanguage()).toBe('uk');
    });
});
//# sourceMappingURL=getPreferredLanguage.test.js.map