import { c as create_ssr_component, v as validate_component } from "../../chunks/index3.js";
import { M as Mdi_icon } from "../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { N as Navbar, S as Section } from "../../chunks/navbar.js";
import { mdiPlus } from "@mdi/js";
import "devalue";
import "uid";
import { E as Empty_list } from "../../chunks/empty-list.js";
import "qrcode";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".layout.svelte-16mf220{height:100%;display:flex;flex-direction:column}.layout.svelte-16mf220{--viewport-margin:var(--br-size-10)}.content.svelte-16mf220{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-10);height:100%}.br-sidebar.svelte-16mf220{--br-list-item-height:var(--br-size-8);--br-sidebar-section-indent:var(--br-size-4);padding-block:var(--br-size-4)}main.svelte-16mf220{margin-right:var(--viewport-margin);display:flex;flex-direction:column;min-width:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1106wzw_START -->${$$result.title = `<title>Projects | Slide Tracking</title>`, ""}<!-- HEAD_svelte-1106wzw_END -->`, ""}

<div class="${"layout svelte-16mf220"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
	<div class="${"content svelte-16mf220"}"><div class="${"br-sidebar svelte-16mf220"}">${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `<button title="${"Sign in to ceate an item"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPlus }, {}, {})}Create New
				</button>`;
    }
  })}
			${validate_component(Section, "Section").$$render($$result, { title: "My projects" }, {}, {
    default: () => {
      return `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
        default: () => {
          return `Your projects will appear here when you sign in
				`;
        }
      })}`;
    }
  })}</div>
		<main class="${"svelte-16mf220"}">${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Your projects will appear here when you sign in
			`;
    }
  })}</main></div>
</div>`;
});
export {
  Page as default
};
