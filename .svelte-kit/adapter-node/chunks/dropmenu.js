import { c as create_ssr_component, v as validate_component } from "./index3.js";
import { M as Mdi_icon } from "./coverslipTable.svelte_svelte_type_style_lang.js";
import { D as Dropdown, P as Popup, A as Arrow } from "./popup.js";
import { mdiDotsHorizontal, mdiDotsVertical, mdiMenuDown } from "@mdi/js";
import "devalue";
import "uid";
import "qrcode";
const css = {
  code: "button[slot=trigger].svelte-1gac321{border:1px solid transparent;background-color:transparent;padding-inline:0;width:var(--br-size-6);height:var(--br-size-6)}button[slot=trigger][type='button'].svelte-1gac321:hover{border:1px solid transparent}",
  map: null
};
const Dropmenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "dots-vertical" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  $$result.css.add(css);
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    trigger: () => {
      return `<button slot="${"trigger"}" type="${"button"}" class="${"svelte-1gac321"}">${icon === "dots-horizontal" ? `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiDotsHorizontal }, {}, {})}` : `${icon === "dots-vertical" ? `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiDotsVertical }, {}, {})}` : `${icon === "menu-down" ? `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiMenuDown }, {}, {})}` : ``}`}`}</button>`;
    },
    default: () => {
      return `
    
    ${validate_component(Popup, "Popup").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Arrow, "Arrow").$$render($$result, {}, {}, {})}
        ${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    }
  })}`;
});
export {
  Dropmenu as D
};
