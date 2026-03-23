import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setInitialPage } from 'routing';
import { Main } from 'components';
import './index.scss';
import { store } from './store';
setInitialPage();
if (__PRODUCTION__ && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '.' });
}
const root = createRoot(document.getElementById('app'));
root.render(_jsx(Provider, { store: store, children: _jsx(Main, {}) }));
//# sourceMappingURL=index.js.map