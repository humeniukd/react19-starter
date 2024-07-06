import { randomUUID } from 'node:crypto';
import template from '../dist/client/index.html?raw';
import { render } from './server.tsx';
import {CloudFrontRequestEvent, CloudFrontRequestHandler} from 'aws-lambda/trigger/cloudfront-request';

const staticCheckRegexp = /\.([0-9a-z]+)(?:[?#]|$)/i;

const isStaticResource = (url: string) => {
  return staticCheckRegexp.test(url);
};

export const handler: CloudFrontRequestHandler = async function (event: CloudFrontRequestEvent, _context, callback) {
  try {
    const request = event.Records[0].cf.request;
    if (isStaticResource(request.uri)) return request;

    const rendered = await render(request)
    const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${rendered}</div>`
    );
    const cookie = request.headers?.cookie?.[0]?.value;

    const headers = {
      "cache-control": [
        {
          key: "Cache-Control",
          value: "max-age=100",
        },
      ],
      "content-type": [
        {
          key: "Content-Type",
          value: "text/html",
        },
      ]
    }

    if (!cookie) {
      const csrf = randomUUID();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      headers['set-cookie'] = [{
        key: 'set-cookie',
        value: `_csrf=${csrf}; Domain=.catchsong.com; Secure; HttpOnly`
      }]
    }

    callback(null, {
      status: "200",
      statusDescription: "OK",
      headers,
      body: html,
    })

  } catch (error) {
    callback(`Error ${error}`)
  }
};