import { c as create_ssr_component, b as subscribe, g as getContext, e as escape, v as validate_component } from './index3-bf5daf62.js';
import { B as Breadcrumb_bar } from './breadcrumb-bar-d5a01d34.js';
import { B as Breadcrumb_link } from './breadcrumb-link-3faa082e.js';
import { B as Breadcrumb_list } from './breadcrumb-list-74c7ce7a.js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import { B as Button_item } from './button-item-730a6055.js';
import { D as Dropdown_item } from './dropdown-item-58034f40.js';
import { p as page } from './stores-6dcd4f9d.js';
import './utils-ae3035df.js';
import { mdiChevronRight } from '@mdi/js';
import { E as Empty_list } from './empty-list-112822b1.js';
import { I as Item_list } from './item-list-cbf4e47f.js';
import { I as Item_list_divider } from './item-list-divider-7c8f8140.js';
import 'qrcode';
import './link-item-18d93ce3.js';
import './dropmenu-414ee6ce.js';
import './popup-1109891f.js';
import 'date-fns';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  getContext("prompt");
  let { data } = $$props;
  const toDate = ({ createdAt }) => createdAt;
  const toLink = ({ id }) => ({ href: `/slide/${id}` });
  const toName = ({ title }) => title;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $page.params;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1hhcbz5_START -->${$$result.title = `<title>${escape(data.experiment.title)} | Slide Tracking</title>`, ""}<!-- HEAD_svelte-1hhcbz5_END -->`, ""}

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
	${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title: data.experiment.title }, {}, {
        default: () => {
          return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Edit experiment
		`;
            }
          })}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Delete experiment
		`;
            }
          })}
		${validate_component(Item_list_divider, "ItemListDivider").$$render($$result, {}, {}, {})}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Add slide/plate
		`;
            }
          })}`;
        }
      })}`;
    }
  })}

${data.experiment.slides.length ? `${validate_component(Item_list, "ItemList").$$render(
    $$result,
    {
      items: data.experiment.slides,
      toDate,
      toName,
      toLink
    },
    {},
    {
      "drop-menu": ({ item }) => {
        let slide = (
          /** @type {Slide} */
          item
        );
        return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(slide.type === "plate" ? "Edit plate" : "Edit slide")}`;
          }
        })}
			${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(slide.type === "plate" ? "Delete plate" : "Delete slide")}`;
          }
        })}`;
      }
    }
  )}` : `${data.experiment ? `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Slides for &#39;${escape(data.experiment.title)}&#39; will appear here when you add them
		`;
    }
  })}` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Slides for this experiment will appear here when you sign in
		`;
    }
  })}`}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-11f74909.js.map
