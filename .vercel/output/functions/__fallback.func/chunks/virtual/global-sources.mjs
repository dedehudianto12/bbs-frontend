const sources = [
    {
        "sourceType": "user",
        "fetch": "/__sitemap__/urls"
    },
    {
        "context": {
            "name": "@nuxt/content@v3:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "No collections found. Make sure your content collections have a `path` field."
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/artikel",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/jasa",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/kontak",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/tentang-kami",
                "lastmod": "2026-07-24T08:46:05.474Z"
            },
            {
                "loc": "/galeri",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/produk/belt-conveyor",
                "lastmod": "2026-07-24T08:46:05.473Z"
            },
            {
                "loc": "/produk/lainnya",
                "lastmod": "2026-07-24T08:46:05.474Z"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
