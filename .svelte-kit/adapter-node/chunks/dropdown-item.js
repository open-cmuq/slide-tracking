import { c as create_ssr_component, v as validate_component, e as escape } from "./index3.js";
import { M as Mdi_icon } from "./coverslipTable.svelte_svelte_type_style_lang.js";
import { D as Dropdown, P as Popup, A as Arrow } from "./popup.js";
import { mdiMenuDown } from "@mdi/js";
import "devalue";
import "uid";
import "qrcode";
const css = {
  code: "button.svelte-6rljd2{font-size:var(--br-size-4);padding-inline:var(--br-size-3)}button.svelte-6rljd2,button.svelte-6rljd2:hover{color:inherit;border:1px solid transparent}button.svelte-6rljd2:not(:hover){background-color:transparent}",
  map: null
};
const Dropdown_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    trigger: () => {
      return `<button slot="${"trigger"}" class="${"br-ignore br-list-item svelte-6rljd2"}">${escape(title)}
		${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiMenuDown }, {}, {})}</button>`;
    },
    default: () => {
      return `${validate_component(Popup, "Popup").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Arrow, "Arrow").$$render($$result, {}, {}, {})}
		${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    }
  })}`;
});
export {
  Dropdown_item as D
};
