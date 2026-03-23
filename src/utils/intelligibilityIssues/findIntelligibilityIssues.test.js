import { findIntelligibilityIssues } from './findIntelligibilityIssues';
describe('findIntelligibilityIssues', () => {
    test.each([[''], ['!'], ['! ! !'], ['be uk']])('should return null for %s', (sameInLanguages) => {
        expect(findIntelligibilityIssues(sameInLanguages)).toEqual({});
    });
    test.each([['  !be~   pl+ mk ru- !sr uk+  ']])('should return object for %s', (sameInLanguages) => {
        expect(findIntelligibilityIssues(sameInLanguages)).toEqual({
            be: '⚠️',
            pl: '✅',
            ru: '🚫',
            uk: '✅',
        });
    });
});
//# sourceMappingURL=findIntelligibilityIssues.test.js.map