import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@vue/shared';
import 'entities/decode';
import 'estree-walker';
import 'source-map-js';
import '@vue/runtime-dom';
import 'consola';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';

const defineSitemapEventHandler = defineEventHandler;

const urls = defineSitemapEventHandler(async () => {
  var _a;
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;
  async function fetchAll(path) {
    var _a2;
    try {
      const res = await $fetch(`${baseURL}${path}`);
      return (_a2 = res.data) != null ? _a2 : [];
    } catch {
      return [];
    }
  }
  const [products, articles, services, industries] = await Promise.all([
    fetchAll("/produk"),
    fetchAll("/artikel"),
    fetchAll("/jasa"),
    fetchAll("/industri")
  ]);
  const urls = [];
  for (const p of products) {
    const group = p.group === "belt-conveyor" ? "belt-conveyor" : "lainnya";
    urls.push({ loc: `/produk/${p.slug}`, lastmod: p.updatedAt });
    urls.push({ loc: `/produk/${group}/${p.category.toLowerCase().replace(/\s+/g, "-")}`, lastmod: p.updatedAt });
  }
  for (const a of articles) {
    urls.push({ loc: `/artikel/${a.slug}`, lastmod: (_a = a.updatedAt) != null ? _a : a.publishedAt });
  }
  for (const s of services) {
    urls.push({ loc: `/jasa/${s.slug}`, lastmod: s.updatedAt });
  }
  for (const i of industries) {
    urls.push({ loc: `/industries/${i.slug}`, lastmod: i.updatedAt });
  }
  return urls;
});

export { urls as default };
//# sourceMappingURL=urls.mjs.map
