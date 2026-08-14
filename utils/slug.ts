// Category names arrive from the API as display text ("PVC Belt", "Gravity
// Roll") and are turned into the URL segment of /produk/{group}/{kategori}.
//
// This lived as five identical inline copies — both group index pages, both
// [kategori].vue pages, and server/routes/__sitemap__/urls.ts. They agreed by
// luck rather than by construction, and the failure mode if they ever drifted
// is silent: the listing pages would link to category URLs that 404, and the
// sitemap would publish those 404s to Google. One definition removes that.
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-')
}
