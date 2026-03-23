import { fn } from '@storybook/test';
import { LineSelector } from './LineSelector';
const meta = {
    title: 'Components/LineSelector',
    component: LineSelector,
    parameters: {
        layout: 'padded',
    },
    argTypes: {},
    tags: ['autodocs'],
    args: {
        onSelect: fn()
    },
};
export default meta;
export const Default = {
    args: {
        options: [
            'Begin',
            'Entire',
            'Any',
        ].map((text) => ({
            name: text,
            value: text.toLowerCase()
        })),
        value: 'begin'
    },
};
export const SecondSelected = {
    args: {
        options: [
            'Begin',
            'Entire',
            'Any',
        ].map((text) => ({
            name: text,
            value: text.toLowerCase()
        })),
        value: 'entire'
    },
};
//# sourceMappingURL=LineSelector.stories.js.map