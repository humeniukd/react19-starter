import type { CloudFrontRequest } from 'aws-lambda/common/cloudfront';

export function createFetchRequest(req: CloudFrontRequest) {
    const host = req.headers?.host?.[0]?.value;
    const base = `https://${host}`;

    const headers = new Headers();
    for (const values of Object.values(req.headers)) {
        values.forEach(({ key, value }) => headers.append(key!, value));
    }

    const url = new URL(req.uri, base);

    const init: Record<string, unknown> = {
        method: req.method,
        headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
        init.body = req.body?.encoding === 'base64' ? btoa(req.body.data) : req.body?.data;
    }

    return new Request(url.href, init);
}