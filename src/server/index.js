import { handleApiWordError } from './api-word-error';
import { handleCompress } from './compress-data';
import { handleOptions } from './handleOptions';
import { responseError } from './responseError';
const routes = [
    {
        match: (pathname) => pathname.startsWith('/data/') || pathname.startsWith('/assets/'),
        handler: handleCompress,
    },
    {
        match: (pathname) => pathname.startsWith('/api/word-error'),
        handler: handleApiWordError,
    },
];
export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return handleOptions(request);
        }
        const { pathname } = new URL(request.url);
        for (const route of routes) {
            if (route.match(pathname)) {
                return route.handler(request, env);
            }
        }
        return responseError('invalidPath');
    }
};
//# sourceMappingURL=index.js.map