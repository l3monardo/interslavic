import { hasIntelligibilityIssues } from 'utils';
export const getWordStatus = (item) => {
    if (item.remove) {
        return {
            icon: '⛔️',
            text: 'suggestedForRemoval',
        };
    }
    if (item.new) {
        return {
            icon: '🌱',
            text: 'suggestedNewWord',
        };
    }
    if (hasIntelligibilityIssues(item)) {
        return {
            icon: '⚠️',
            text: 'intelligibilityIssues',
        };
    }
};
//# sourceMappingURL=getWordStatus.js.map