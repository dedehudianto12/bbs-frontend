import { t as tryUseNuxtApp } from '../virtual/entry.mjs';
import { A as withoutTrailingSlash, J as getRequestHeaders } from '../nitro/nitro.mjs';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcontent%2Fmanifest.ts
var checksums = {
	"products": "v3.5.0--e0iGTwPr3_ba9MPSw2zLnzFTJNJ3H6QhfY0B1vrEe9E",
	"services": "v3.5.0--eZweNN7r6H-b39K4xbXsF0lZ7pb4_U4eHSpDRv1QiAc",
	"industries": "v3.5.0--VhRfPvmWfD4iaGoxyFOETNH7HmCTyU-A2VFvafF_c60",
	"blog": "v3.5.0--6ctncYHxgSCBDWZCw89Y5Xc_5ppJuhs-Zuw69wdphjg",
	"gallery": "v3.5.0--OM1kyc_ykD0BgR_C8UDCIZRlThXAgK8Pg4sibgiGRkY",
	"pages": "v3.5.0--gSCCCawIuobX8v_bwwHCXSnB2JS4ATp8yDwcIW4zVAk",
	"homepage": "v3.5.0--KXQfqIA14J-M_p4riMO0eeZlI7JIRNkOhi2K0Uux_as",
	"homepageConfig": "v3.5.0--GC1ocvpCz--MFWrxCHMRbreINVmhhqnJ0l83s0HAXoA",
	"navigation": "v3.5.0--VBO1pDlEfZQYkse6cqV_pBXSYuuHvyIjxqWjKs66hi4"
};
var tables = {
	"products": "_content_products",
	"services": "_content_services",
	"industries": "_content_industries",
	"blog": "_content_blog",
	"gallery": "_content_gallery",
	"pages": "_content_pages",
	"homepage": "_content_homepage",
	"homepageConfig": "_content_homepageConfig",
	"navigation": "_content_navigation",
	"info": "_content_info"
};
//#endregion
//#region node_modules/@nuxt/content/dist/runtime/internal/query.js
var buildGroup = (group, type) => {
	const conditions = group._conditions;
	return conditions.length > 0 ? `(${conditions.join(` ${type} `)})` : "";
};
var collectionQueryGroup = (collection) => {
	const conditions = [];
	const query = {
		_conditions: conditions,
		where(field, operator, value) {
			let condition;
			switch (operator.toUpperCase()) {
				case "IN":
				case "NOT IN":
					if (Array.isArray(value)) {
						const values = value.map((val) => singleQuote(val)).join(", ");
						condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
					} else throw new TypeError(`Value for ${operator} must be an array`);
					break;
				case "BETWEEN":
				case "NOT BETWEEN":
					if (Array.isArray(value) && value.length === 2) condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value[0])} AND ${singleQuote(value[1])}`;
					else throw new Error(`Value for ${operator} must be an array with two elements`);
					break;
				case "IS NULL":
				case "IS NOT NULL":
					condition = `"${String(field)}" ${operator.toUpperCase()}`;
					break;
				case "LIKE":
				case "NOT LIKE":
					condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value)}`;
					break;
				default: condition = `"${String(field)}" ${operator} ${singleQuote(typeof value === "boolean" ? Number(value) : value)}`;
			}
			conditions.push(`${condition}`);
			return query;
		},
		andWhere(groupFactory) {
			const group = groupFactory(collectionQueryGroup());
			conditions.push(buildGroup(group, "AND"));
			return query;
		},
		orWhere(groupFactory) {
			const group = groupFactory(collectionQueryGroup());
			conditions.push(buildGroup(group, "OR"));
			return query;
		}
	};
	return query;
};
var collectionQueryBuilder = (collection, fetch) => {
	const params = {
		conditions: [],
		selectedFields: [],
		offset: 0,
		limit: 0,
		orderBy: [],
		count: {
			field: "",
			distinct: false
		}
	};
	const query = {
		__params: params,
		andWhere(groupFactory) {
			const group = groupFactory(collectionQueryGroup());
			params.conditions.push(buildGroup(group, "AND"));
			return query;
		},
		orWhere(groupFactory) {
			const group = groupFactory(collectionQueryGroup());
			params.conditions.push(buildGroup(group, "OR"));
			return query;
		},
		path(path) {
			return query.where("path", "=", withoutTrailingSlash(path));
		},
		skip(skip) {
			params.offset = skip;
			return query;
		},
		where(field, operator, value) {
			query.andWhere((group) => group.where(String(field), operator, value));
			return query;
		},
		limit(limit) {
			params.limit = limit;
			return query;
		},
		select(...fields) {
			if (fields.length) params.selectedFields.push(...fields);
			return query;
		},
		order(field, direction) {
			params.orderBy.push(`"${String(field)}" ${direction}`);
			return query;
		},
		async all() {
			return fetch(collection, buildQuery()).then((res) => res || []);
		},
		async first() {
			return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
		},
		async count(field = "*", distinct = false) {
			return fetch(collection, buildQuery({ count: {
				field: String(field),
				distinct
			} })).then((m) => m[0].count);
		}
	};
	function buildQuery(opts = {}) {
		let query2 = "SELECT ";
		if (opts?.count) query2 += `COUNT(${opts.count.distinct ? "DISTINCT " : ""}${opts.count.field}) as count`;
		else {
			const fields = Array.from(new Set(params.selectedFields));
			query2 += fields.length > 0 ? fields.map((f) => `"${String(f)}"`).join(", ") : "*";
		}
		query2 += ` FROM ${tables[String(collection)]}`;
		if (params.conditions.length > 0) query2 += ` WHERE ${params.conditions.join(" AND ")}`;
		if (params.orderBy.length > 0) query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
		else query2 += ` ORDER BY stem ASC`;
		const limit = opts?.limit || params.limit;
		if (limit > 0) if (params.offset > 0) query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
		else query2 += ` LIMIT ${limit}`;
		return query2;
	}
	return query;
};
function singleQuote(value) {
	return `'${String(value).replace(/'/g, "''")}'`;
}
//#endregion
//#region node_modules/@nuxt/content/dist/runtime/internal/api.js
async function fetchContent(event, collection, path, options) {
	const headers = event ? getRequestHeaders(event) : {};
	headers["accept-encoding"] = void 0;
	const url = `/__nuxt_content/${collection}/${path}`;
	const fetchOptions = {
		...options,
		headers: {
			...headers,
			...options.headers
		},
		query: {
			v: checksums[String(collection)],
			t: void 0
		}
	};
	return event ? await event.$fetch(url, fetchOptions) : await $fetch(url, fetchOptions);
}
async function fetchQuery(event, collection, sql) {
	return fetchContent(event, collection, "query", {
		headers: { "content-type": "application/json" },
		method: "POST",
		body: { sql }
	});
}
//#endregion
//#region node_modules/@nuxt/content/dist/runtime/client.js
var queryCollection = (collection) => {
	const event = tryUseNuxtApp()?.ssrContext?.event;
	return collectionQueryBuilder(collection, (collection2, sql) => executeContentQuery(event, collection2, sql));
};
async function executeContentQuery(event, collection, sql) {
	return fetchQuery(event, String(collection), sql);
}

export { queryCollection as q };
//# sourceMappingURL=client-DOm3OzYp.mjs.map
