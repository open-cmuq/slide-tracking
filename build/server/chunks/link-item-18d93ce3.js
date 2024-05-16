import { c as create_ssr_component, b as subscribe, f as add_attribute } from './index3-bf5daf62.js';
import { p as page } from './stores-6dcd4f9d.js';

const css = {
  code: ".active.svelte-5u8358:not([aria-current]){background-color:var(--br-light, rgb(240, 240, 240)) var(--br-dark, #333)}.active.svelte-5u8358:not([aria-current]):hover{background-color:var(--br-light, rgb(230, 230, 230)) var(--br-dark, #555)}",
  map: null
};
const Link_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _current;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { href } = $$props;
  let { active = false } = $$props;
  let { current = null } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.current === void 0 && $$bindings.current && current !== void 0)
    $$bindings.current(current);
  $$result.css.add(css);
  _current = current ?? (href.startsWith("/") && $page.url.pathname === href ? "page" : null);
  $$unsubscribe_page();
  return `<a${add_attribute("href", href, 0)} class="${["br-list-item svelte-5u8358", active ? "active" : ""].join(" ").trim()}"${add_attribute("aria-current", _current, 0)}>${slots.default ? slots.default({}) : ``}
</a>`;
});

export { Link_item as L };
//# sourceMappingURL=link-item-18d93ce3.js.map
