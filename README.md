# protonicprecision.com

Static site for Protonic Precision. No dependencies: `node build.mjs` writes the whole site to `dist/`.

| Command | What it does |
| --- | --- |
| `node build.mjs` | Builds every page, the search index, sitemap and robots.txt into `dist/`, and fails if any internal link points nowhere |
| `node tools/serve.mjs` | Serves `dist/` at http://localhost:4820 the way Render does |
| `node tools/render-images.mjs [slug…]` | Re-renders product images from the 3D models (needs Chrome + ImageMagick; run locally, commit the WebP files) |

## Where things live

| You want to change | Edit |
| --- | --- |
| A product, its specs or status | `src/data/products.mjs` (every card, menu, filter and search result reads it) |
| Contact email, menus, footer, FAQ | `src/data/site.mjs` |
| Page layouts | `src/pages/*.mjs`, shared frame in `src/layout.mjs` |
| Styles | `src/assets/css/site.css` |
| Logo geometry | `tools/brand/` (same source as the brand kit) |

Hosting: GitHub Pages, built by `.github/workflows/pages.yml`. Every push to `main` redeploys in about a minute.
