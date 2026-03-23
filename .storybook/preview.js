import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { store } from '../src/store';
import '../src/index.scss';
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                theme: /(light|dark)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story, { parameters }) => {
            const { theme } = parameters;
            switch (theme) {
                case 'dark':
                    return (_jsx("div", { id: "app", className: "color-theme--dark", children: _jsx(Story, {}) }));
                case 'light':
                default:
                    return (_jsx("div", { id: "app", className: "color-theme--light", children: _jsx(Story, {}) }));
            }
        },
        (Story, { parameters }) => {
            const { redux } = parameters;
            if (redux) {
                return (_jsx(Provider, { store: store, children: _jsx(Story, {}) }));
            }
            else {
                return _jsx(Story, {});
            }
        },
    ],
};
export default preview;
//# sourceMappingURL=preview.js.map