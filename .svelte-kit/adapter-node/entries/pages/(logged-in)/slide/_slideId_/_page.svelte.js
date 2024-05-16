import { c as create_ssr_component, b as subscribe, g as getContext, e as escape, v as validate_component, d as add_attribute, f as each, r as null_to_empty } from "../../../../../chunks/index3.js";
import { B as Breadcrumb_bar } from "../../../../../chunks/breadcrumb-bar.js";
import { B as Breadcrumb_link } from "../../../../../chunks/breadcrumb-link.js";
import { B as Breadcrumb_list } from "../../../../../chunks/breadcrumb-list.js";
import { M as Mdi_icon } from "../../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { format } from "date-fns";
import { B as Button_item } from "../../../../../chunks/button-item.js";
import { D as Dropdown_item } from "../../../../../chunks/dropdown-item.js";
import { L as Link_item } from "../../../../../chunks/link-item.js";
import "devalue";
import { p as page } from "../../../../../chunks/stores.js";
import { mdiChevronRight, mdiPlus, mdiNoteEdit, mdiPrinter, mdiTable } from "@mdi/js";
import "uid";
import { S as Slide, C as Coverslip } from "../../../../../chunks/slide.js";
import { I as Item_list_divider } from "../../../../../chunks/item-list-divider.js";
import { P as Plate } from "../../../../../chunks/plate.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-14wme5j{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}.slide.svelte-14wme5j{position:relative;padding-inline:var(--br-size-3);padding-block:var(--br-size-4)}.field.svelte-14wme5j,.value.svelte-14wme5j{padding-inline:var(--br-sidebar-section-indent, var(--br-size-3))}.field.svelte-14wme5j{padding-block:var(--br-size-4) var(--br-size-2);text-transform:uppercase;color:var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));font-size:12.5px;line-height:1}@media print{.printable.svelte-14wme5j{display:block;width:1.5in;height:1.5in}}.plate-grid.svelte-14wme5j{width:100%;height:100%;display:grid;grid-template-columns:repeat(12, 1fr);gap:4px}.platediv.svelte-14wme5j{display:flex;width:100%;height:100%;padding:10px}.add-button-container.svelte-14wme5j{position:absolute;top:20%;right:200px}.empty-coverslip.svelte-14wme5j{border:1px solid #ccc;background-color:#f5f5f5;border-radius:50%;text-align:center;color:rgb(135, 135, 135)}.selected-well.svelte-14wme5j{background-color:orange;border-radius:50%;text-align:center;color:black}.empty-coverslip.svelte-14wme5j:hover{border:1px solid orange;background-color:orange}.selectbutton.svelte-14wme5j{position:absolute;top:23px;left:13px;border-radius:50%;background-color:orange;border:none;cursor:pointer;color:black;width:30px;height:30px;display:flex;align-items:center;justify-content:center}.editbutton.svelte-14wme5j{position:absolute;top:75%;left:33%;width:150px;font-size:large;background-color:rgb(255, 172, 17);color:black}.selection-rectangle.svelte-14wme5j{position:absolute;border:1px dashed rgb(255, 204, 0);background-color:rgba(255, 187, 0, 0.616);display:none;z-index:10}.noselect.svelte-14wme5j{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item.svelte-14wme5j{position:relative;padding-right:100px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slideId;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  getContext("prompt");
  let { data } = $$props;
  let selectedWells = /* @__PURE__ */ new Set();
  let anchors = data.slide?.coverslips.map(() => ({}));
  let selectionRectangle;
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
	${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title: data.slide.title }, {}, {
        default: () => {
          return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(data.slide.type === "plate" ? "Edit plate" : "Edit slide")}`;
            }
          })}
		${data.slide.type == "slide" ? `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Delete slide
			`;
            }
          })}` : ``}
		${validate_component(Item_list_divider, "ItemListDivider").$$render($$result, {}, {}, {})}
		
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Add coverslip
		`;
            }
          })}

		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Print the QR Code
		`;
            }
          })}`;
        }
      })}`;
    }
  })}

<div class="${"wrapper svelte-14wme5j"}">${`<div class="${"selection-rectangle svelte-14wme5j"}"${add_attribute("this", selectionRectangle, 0)}></div>`}
	<div class="${"slide noselect svelte-14wme5j"}">${data.slide.type == "slide" ? `${validate_component(Slide, "Slide").$$render($$result, { slideId }, {}, {
    default: () => {
      return `${each(data.slide.coverslips, (coverslip, i) => {
        return `${validate_component(Coverslip, "Coverslip").$$render(
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
        )}`;
      })}`;
    }
  })}` : `<button class="${"selectbutton svelte-14wme5j"}" style="${"background-color: " + escape("orange", true) + ";"}">${`${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPlus }, {}, {})}`}</button>
		
		${validate_component(Plate, "Plate").$$render($$result, { slideId }, {}, {
    default: () => {
      return `<div class="${"platediv svelte-14wme5j"}"><div class="${"plate-grid svelte-14wme5j"}">${each(data.slide?.coverslips, (coverslip, i) => {
        return `<a class="${[
          escape(null_to_empty(`my-anchor-${i}`), true) + " svelte-14wme5j",
          (selectedWells.has(coverslip.id) ? "selected-well" : "") + " " + (!selectedWells.has(coverslip.id) ? "empty-coverslip" : "")
        ].join(" ").trim()}"${add_attribute("href", "", 0)}${add_attribute("this", anchors[i], 0)}>${selectedWells.has(coverslip.id) ? `+` : `${escape(i + 1)}`}
						</a>`;
      })}</div></div>`;
    }
  })}
			${`<button class="${"editbutton svelte-14wme5j"}">Edit selected</button>`}`}</div>
	<div><div class="${"item svelte-14wme5j"}"><div class="${"experiment-container"}"><div class="${"field svelte-14wme5j"}">Experiment</div>
				<a class="${"value svelte-14wme5j"}" href="${"/experiment/" + escape(data.slide.experiment.id, true)}">${escape(data.slide.experiment.title)}</a></div>
			  
				<div class="${"add-button-container svelte-14wme5j"}">${data.slide.type == "slide" ? `<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPlus }, {}, {})}
							Add coverslip
						</button>
						<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiNoteEdit }, {}, {})}
							Edit slide
						</button>
						<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPrinter }, {}, {})}</button>` : `${validate_component(Link_item, "Item.Link").$$render($$result, { href: "/slide/" + slideId + "/table" }, {}, {
    default: () => {
      return `<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiTable }, {}, {})}
							Table view
						</button>`;
    }
  })}`}</div></div>
		<div class="${"item svelte-14wme5j"}"><div class="${"field svelte-14wme5j"}">Location</div>
			<div class="${"value svelte-14wme5j"}">Box ${data.slide.boxNumber ? `${escape(data.slide.boxNumber)}` : `<em>unknown</em>,`}
				position ${data.slide.boxPosition ? `${escape(data.slide.boxPosition)}` : `<em>unknown</em>`}</div></div>
		<div class="${"double-column"}"><div class="${"item svelte-14wme5j"}"><div class="${"field svelte-14wme5j"}">Prepared by</div>
				<div class="${"value svelte-14wme5j"}">${escape(data.slide.createdBy.name)}</div></div>
			<div class="${"item svelte-14wme5j"}"><div class="${"field svelte-14wme5j"}">Observed on</div>
				<div class="${"value svelte-14wme5j"}">${escape(format(new Date(data.slide.observedOn), "EEEE, MMM dd yyyy"))}</div></div></div>
		${data.slide.comments ? `<div class="${"item svelte-14wme5j"}"><div class="${"field svelte-14wme5j"}">Comments</div>
				<div>${escape(data.slide.comments)}</div></div>` : ``}</div>
</div>`;
});
export {
  Page as default
};
