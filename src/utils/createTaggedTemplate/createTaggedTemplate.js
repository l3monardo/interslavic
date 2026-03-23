/**
 * Creates a tagged template literal function that applies
 * a transformation to either the template strings or the interpolated values.
 *
 * @param transformFn - The function to apply to each string or value.
 * @param applyTo - Specifies whether to apply the transformation to the template strings or the interpolated values.
 * @returns {(strings: TemplateStringsArray, ...values: unknown[]) => string} The tagged template literal function.
 */
export function createTaggedTemplate(transformFn, applyTo) {
    return (strings, ...values) => {
        const $strings = applyTo === 'strings' ? strings.map(transformFn) : strings;
        const $values = applyTo === 'values' ? values.map(transformFn) : values;
        return $strings.reduce((result, str, index) => {
            return result + str + ($values[index] || '');
        }, '');
    };
}
//# sourceMappingURL=createTaggedTemplate.js.map