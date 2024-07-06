import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { routes } from './routes.tsx';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { createFetchRequest } from './createFetchRequest.ts';
import type { Request as Req, Response as Res } from 'express'

export async function render(req: Req, res?: Res) {
    const { query, dataRoutes } = createStaticHandler(routes);
    const fetchRequest = createFetchRequest(req, res);
    const context = await query(fetchRequest);

    if (context instanceof Response) {
        throw context;
    }

    const router = createStaticRouter(dataRoutes, context);

    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouterProvider
                router={router}
                context={context}
            />
        </React.StrictMode>
    );
}