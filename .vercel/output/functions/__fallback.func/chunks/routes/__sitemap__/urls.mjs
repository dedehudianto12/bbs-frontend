import { d as defineSitemapEventHandler, q as queryCollection } from '../../nitro/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'vue';
import 'consola';
import 'minimatch';
import 'node:fs/promises';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'better-sqlite3';

const urls = defineSitemapEventHandler(async () => {
  var _a;
  const [products, blogPosts, services, industries, pages] = await Promise.all([
    queryCollection("products").all(),
    queryCollection("blog").all(),
    queryCollection("services").all(),
    queryCollection("industries").all(),
    queryCollection("pages").all()
  ]);
  const urls = [];
  for (const p of products) {
    const group = p.group === "belt-conveyor" ? "belt-conveyor" : "lainnya";
    urls.push({ loc: `/produk/${p.slug}`, lastmod: p.updatedAt });
    urls.push({ loc: `/produk/${group}/${p.category.toLowerCase().replace(/\s+/g, "-")}`, lastmod: p.updatedAt });
  }
  for (const a of blogPosts) {
    urls.push({ loc: `/artikel/${a.slug}`, lastmod: (_a = a.updatedAt) != null ? _a : a.publishedAt });
  }
  for (const s of services) {
    urls.push({ loc: `/jasa/${s.slug}`, lastmod: s.updatedAt });
  }
  for (const i of industries) {
    urls.push({ loc: `/industries/${i.slug}`, lastmod: i.updatedAt });
  }
  for (const pg of pages) {
    urls.push({ loc: `/${pg.slug}`, lastmod: pg.updatedAt });
  }
  return urls;
});

export { urls as default };
//# sourceMappingURL=urls.mjs.map
