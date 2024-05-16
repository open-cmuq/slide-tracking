import { c as create_ssr_component } from "./index3.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
const css = {
  code: ".crumbs.svelte-19wawax{display:flex;align-items:center;border-bottom:var(--br-global-border);padding-block:var(--br-size-3);min-width:0;max-width:100%;overflow-y:auto}",
  map: null
};
const Breadcrumb_bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"crumbs svelte-19wawax"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Breadcrumb_bar as B
};
