import { fn } from '@storybook/test';
import { Checkbox } from './Checkbox';
const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onChange: fn() },
};
export default meta;
export const Checked = {
    args: {
        title: 'Checkbox',
        checked: true,
    },
};
export const Unchecked = {
    args: {
        title: 'Checkbox',
        checked: false,
    },
};
//# sourceMappingURL=Checkbox.stories.js.map