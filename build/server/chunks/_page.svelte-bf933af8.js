import { c as create_ssr_component, v as validate_component } from './index3-bf5daf62.js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import { N as Navbar, S as Section } from './navbar-957f1c00.js';
import { mdiPlus } from '@mdi/js';
import './utils-ae3035df.js';
import { E as Empty_list } from './empty-list-112822b1.js';
import 'qrcode';
import './popup-1109891f.js';
import './stores-6dcd4f9d.js';
import './button-item-730a6055.js';

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

export { Page as default };
//# sourceMappingURL=_page.svelte-bf933af8.js.map
