import { c as create_ssr_component, f as each, e as escape, b as subscribe, g as getContext, v as validate_component } from "../../../../../../chunks/index3.js";
import { B as Breadcrumb_bar } from "../../../../../../chunks/breadcrumb-bar.js";
import { B as Breadcrumb_link } from "../../../../../../chunks/breadcrumb-link.js";
import { B as Breadcrumb_list } from "../../../../../../chunks/breadcrumb-list.js";
import { M as Mdi_icon } from "../../../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { mdiChevronRight } from "@mdi/js";
import { p as page } from "../../../../../../chunks/stores.js";
import "devalue";
import "uid";
import "qrcode";
const css$1 = {
  code: "table.svelte-wrkfny.svelte-wrkfny{width:100%;border-collapse:collapse}td.svelte-wrkfny.svelte-wrkfny,th.svelte-wrkfny.svelte-wrkfny{border:1px solid #ddd;padding:8px}th.svelte-wrkfny.svelte-wrkfny{background-color:#f4f4f4}thead.svelte-wrkfny tr.svelte-wrkfny{background-color:#f5f5f5;color:black}",
  map: null
};
function formatDate(dateString) {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", options);
}
const CoverslipTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { coverslips } = $$props;
  if ($$props.coverslips === void 0 && $$bindings.coverslips && coverslips !== void 0)
    $$bindings.coverslips(coverslips);
  $$result.css.add(css$1);
  return `<table class="${"svelte-wrkfny"}"><thead class="${"svelte-wrkfny"}"><tr class="${"svelte-wrkfny"}"><th class="${"svelte-wrkfny"}">ID</th>
      <th class="${"svelte-wrkfny"}">Coating</th>
      <th class="${"svelte-wrkfny"}">Specimen</th>
      <th class="${"svelte-wrkfny"}">Created At</th>
      <th class="${"svelte-wrkfny"}">Updated At</th></tr></thead>
  <tbody>${each(coverslips, (coverslip, index) => {
    return `<tr><td class="${"svelte-wrkfny"}">${escape(index + 1)}</td>
        <td class="${"svelte-wrkfny"}">${escape(coverslip.coating)}</td>
        <td class="${"svelte-wrkfny"}">${escape(coverslip.specimen)}</td>
        <td class="${"svelte-wrkfny"}">${escape(formatDate(coverslip.createdAt))}</td>
        <td class="${"svelte-wrkfny"}">${escape(formatDate(coverslip.updatedAt))}</td>
      </tr>`;
  })}</tbody>
</table>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".table-title.svelte-13yxro3{font-size:var(--br-size-5)}.center.svelte-13yxro3{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.content.svelte-13yxro3{--icon-size:var(--br-size-11);font-size:var(--br-size-4);color:var(--br-dark, #b0b0b0) var(--br-light, #888);flex:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slideId;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  getContext("prompt");
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ slideId } = $page.params);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1pq79r3_START -->${$$result.title = `<title>${escape(data.slide.title)} | Slide Tracking</title>`, ""}<!-- HEAD_svelte-1pq79r3_END -->`, ""}

${validate_component(Breadcrumb_bar, "Breadcrumb.Bar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Breadcrumb_link, "Breadcrumb.Link").$$render($$result, { href: "/projects" }, {}, {
        default: () => {
          return `My projects
	`;
        }
      })}
	${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiChevronRight }, {}, {})}
	${validate_component(Breadcrumb_list, "Breadcrumb.List").$$render($$result, {}, {}, {})}
	${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiChevronRight }, {}, {})}
	${validate_component(Breadcrumb_link, "Breadcrumb.Link").$$render($$result, { href: "/slide/" + slideId }, {}, {
        default: () => {
          return `${escape(data.slide.title)}`;
        }
      })}`;
    }
  })}

<div class="${"wrapper"}">${data.slide.type == "plate" ? `<div class="${"center content svelte-13yxro3"}"><div class="${"table-title svelte-13yxro3"}">Table with information for a plate ${escape(data.slide.title)}</div>
			${validate_component(CoverslipTable, "CoverslipTable").$$render($$result, { coverslips: data.slide.coverslips }, {}, {})}</div>` : ``}
</div>`;
});
export {
  Page as default
};
