import { c as create_ssr_component, g as getContext, f as each, v as validate_component, e as escape } from "../../../../../../chunks/index3.js";
import "../../../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { s as stainingFields } from "../../../../../../chunks/stainining_fields.js";
import { B as Button_item } from "../../../../../../chunks/button-item.js";
import { D as Dropdown_item } from "../../../../../../chunks/dropdown-item.js";
import "devalue";
import "uid";
import { E as Empty_list } from "../../../../../../chunks/empty-list.js";
import "qrcode";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".stainings.svelte-1uuuo79{padding-block-start:var(--br-size-3)}.field.svelte-1uuuo79,.value.svelte-1uuuo79{padding-inline:var(--br-sidebar-section-indent, var(--br-size-3))}.field.svelte-1uuuo79{padding-block:var(--br-size-3) var(--br-size-2);text-transform:uppercase;color:var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));font-size:12.5px;line-height:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  getContext("prompt");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"stainings svelte-1uuuo79"}">${data.stainings.length ? `<div class="${"double-column"}">${each(data.stainings, (staining, i) => {
    return `<div>${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title: "Staining #" + (i + 1) }, {}, {
      default: () => {
        return `${validate_component(Button_item, "Item.Button").$$render($$result, {}, {}, {
          default: () => {
            return `Edit staining
						`;
          }
        })}
						${validate_component(Button_item, "Item.Button").$$render($$result, {}, {}, {
          default: () => {
            return `Delete staining
						`;
          }
        })}
					`;
      }
    })}
					${each(staining.fields, (field) => {
      return `<div class="${"item"}"><div class="${"field svelte-1uuuo79"}">${escape(stainingFields[
        /** @type {keyof stainingFields}*/
        field.name
      ])}</div>
							<div class="${"value svelte-1uuuo79"}">${escape(field.value)}</div>
						</div>`;
    })}
				</div>`;
  })}</div>` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Your stainings will appear here when you add them
		`;
    }
  })}`}
</div>`;
});
export {
  Page as default
};
