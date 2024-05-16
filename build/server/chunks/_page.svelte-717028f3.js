import { c as create_ssr_component, b as subscribe, g as getContext, e as escape, v as validate_component } from './index3-bf5daf62.js';
import { B as Breadcrumb_bar } from './breadcrumb-bar-d5a01d34.js';
import { B as Breadcrumb_link } from './breadcrumb-link-3faa082e.js';
import { p as page } from './stores-6dcd4f9d.js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import { B as Button_item } from './button-item-730a6055.js';
import { D as Dropdown_item } from './dropdown-item-58034f40.js';
import './utils-ae3035df.js';
import { mdiChevronRight } from '@mdi/js';
import { E as Empty_list } from './empty-list-112822b1.js';
import { I as Item_list } from './item-list-cbf4e47f.js';
import { I as Item_list_divider } from './item-list-divider-7c8f8140.js';
import 'qrcode';
import './popup-1109891f.js';
import 'date-fns';
import './dropmenu-414ee6ce.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  getContext("prompt");
  let { data } = $$props;
  const toDate = ({ createdAt }) => createdAt;
  const toLink = ({ id }) => ({ href: `/experiment/${id}` });
  const toName = ({ title }) => title;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $page.params;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-iyf2g7_START -->${$$result.title = `<title>${escape(data.project.title)} | Slide Tracking</title>`, ""}<!-- HEAD_svelte-iyf2g7_END -->`, ""}

${validate_component(Breadcrumb_bar, "Breadcrumb.Bar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Breadcrumb_link, "Breadcrumb.Link").$$render($$result, { href: "/projects" }, {}, {
        default: () => {
          return `My projects
	`;
        }
      })}
	${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiChevronRight }, {}, {})}
	${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title: data.project.title }, {}, {
        default: () => {
          return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Edit project
		`;
            }
          })}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Delete project
		`;
            }
          })}
		${validate_component(Item_list_divider, "ItemListDivider").$$render($$result, {}, {}, {})}
		${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
            default: () => {
              return `Add experiment
		`;
            }
          })}`;
        }
      })}`;
    }
  })}

${data.project.experiments.length ? `${validate_component(Item_list, "ItemList").$$render(
    $$result,
    {
      items: data.project.experiments,
      toDate,
      toLink,
      toName
    },
    {},
    {
      "drop-menu": ({ item }) => {
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
        })}`;
      }
    }
  )}` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Experiments for &#39;${escape(data.project.title)}&#39; will appear here when you add them
	`;
    }
  })}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-717028f3.js.map
