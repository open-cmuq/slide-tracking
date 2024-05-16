import { c as create_ssr_component, b as subscribe, g as getContext, e as escape, v as validate_component, f as each, d as add_attribute } from "../../../../../chunks/index3.js";
import { B as Breadcrumb_bar } from "../../../../../chunks/breadcrumb-bar.js";
import { B as Breadcrumb_link } from "../../../../../chunks/breadcrumb-link.js";
import { B as Breadcrumb_list } from "../../../../../chunks/breadcrumb-list.js";
import { M as Mdi_icon } from "../../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { B as Button_item } from "../../../../../chunks/button-item.js";
import { D as Dropdown_item } from "../../../../../chunks/dropdown-item.js";
import { L as Link_item } from "../../../../../chunks/link-item.js";
import "devalue";
import { p as page } from "../../../../../chunks/stores.js";
import { mdiChevronRight } from "@mdi/js";
import "uid";
import { S as Slide, C as Coverslip } from "../../../../../chunks/slide.js";
import { I as Item_list_divider } from "../../../../../chunks/item-list-divider.js";
import { P as Plate } from "../../../../../chunks/plate.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-ciobte{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}.slide.svelte-ciobte{padding-inline:var(--br-size-3);padding-block:var(--br-size-4)}.plate-grid.svelte-ciobte{width:100%;height:100%;display:grid;grid-template-columns:repeat(12, 1fr);gap:4px}.platediv.svelte-ciobte{display:flex;width:100%;height:100%;padding:10px}.empty-coverslip.svelte-ciobte{border:1px solid #ccc;background-color:#f5f5f5;border-radius:50%;text-align:center;color:rgb(135, 135, 135)}.active.svelte-ciobte{border:1px solid orange;background-color:orange}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let coverslipId;
  let index;
  let slideId;
  let title;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const title_var = data.current.slide.type == "plate" ? "Well" : "Coverslip";
  getContext("prompt");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ coverslipId } = $page.params);
  index = data.coverslips.findIndex((coverslip) => coverslip.id === coverslipId);
  ({ slideId } = data.coverslips[index]);
  title = `${title_var} #${index + 1}`;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-bz965u_START -->${$$result.title = `<title>${escape(title)} | Slide Tracking</title>`, ""}<!-- HEAD_svelte-bz965u_END -->`, ""}

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
	${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title }, {}, {
        default: () => {
          return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Edit ${escape(title_var)}`;
            }
          })}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Delete ${escape(title_var)}`;
            }
          })}
		${validate_component(Item_list_divider, "ItemListDivider").$$render($$result, {}, {}, {})}
		${validate_component(Link_item, "Item.Link").$$render(
            $$result,
            {
              href: "/coverslip/" + coverslipId + "/staining"
            },
            {},
            {
              default: () => {
                return `View stainings
		`;
              }
            }
          )}
		${validate_component(Link_item, "Item.Link").$$render(
            $$result,
            {
              href: "/coverslip/" + coverslipId + "/files"
            },
            {},
            {
              default: () => {
                return `View files
		`;
              }
            }
          )}
		${validate_component(Item_list_divider, "ItemListDivider").$$render($$result, {}, {}, {})}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Add staining
		`;
            }
          })}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Add file
		`;
            }
          })}`;
        }
      })}`;
    }
  })}
<div class="${"wrapper svelte-ciobte"}"><div class="${"slide svelte-ciobte"}">${data.coverslips != null && data?.coverslips[0]?.plateIdx === -1 ? `${validate_component(Slide, "Slide").$$render($$result, { slideId }, {}, {
    default: () => {
      return `${each(data.coverslips, (coverslip, i) => {
        return `${coverslip.id === coverslipId ? `${validate_component(Coverslip, "Coverslip").$$render(
          $$result,
          {
            coverslip,
            active: true,
            href: "/coverslip/" + coverslipId
          },
          {},
          {
            default: () => {
              return `#${escape(i + 1)}
						`;
            }
          }
        )}` : `${validate_component(Coverslip, "Coverslip").$$render(
          $$result,
          {
            coverslip,
            href: "/coverslip/" + coverslip.id
          },
          {},
          {
            default: () => {
              return `#${escape(i + 1)}
						`;
            }
          }
        )}`}`;
      })}`;
    }
  })}` : `${validate_component(Plate, "Plate").$$render($$result, { slideId }, {}, {
    default: () => {
      return `<div class="${"platediv svelte-ciobte"}"><div class="${"plate-grid svelte-ciobte"}">${each(data.coverslips, (coverslip, i) => {
        return `${coverslip.id === coverslipId ? `<a class="${"empty-coverslip active svelte-ciobte"}"${add_attribute("href", null, 0)}>${escape(i + 1)}
								</a>` : `<a class="${"empty-coverslip svelte-ciobte"}"${add_attribute("href", null, 0)}>${escape(i + 1)}
								</a>`}`;
      })}</div></div>`;
    }
  })}`}</div>
	<div>${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
export {
  Layout as default
};
