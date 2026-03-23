import { fn } from '@storybook/test';
import { Button } from './Button';
const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn() },
};
export default meta;
export const Primary = {
    args: {
        title: 'Button',
        type: 'primary',
    },
};
export const Error = {
    args: {
        title: 'Button',
        type: 'error',
    },
};
export const Muter = {
    args: {
        title: 'Button',
        type: 'muted',
    },
};
export const Small = {
    args: {
        title: 'Button',
        size: 'S',
    },
};
export const Medium = {
    args: {
        title: 'Button',
        size: 'M',
    },
};
export const Large = {
    args: {
        title: 'Button',
        size: 'L',
    },
};
export const NotFill = {
    args: {
        title: 'Button',
        fill: false,
    },
};
export const Disabled = {
    args: {
        title: 'Button',
        disabled: true,
    },
};
//# sourceMappingURL=Button.stories.js.map