import { c as create_ssr_component, d as add_attribute } from "./index3.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
const css = {
  code: "a.svelte-vx3ydx{font-size:var(--br-size-4);padding-inline:var(--br-size-3)}",
  map: null
};
const Breadcrumb_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  $$result.css.add(css);
  return `<a${add_attribute("href", href, 0)} class="${"br-list-item svelte-vx3ydx"}">${slots.default ? slots.default({}) : ``}
</a>`;
});
export {
  Breadcrumb_link as B
};
