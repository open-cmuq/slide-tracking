import { c as create_ssr_component, e as escape, g as getContext, v as validate_component } from "../../../../chunks/index3.js";
import { B as Breadcrumb_bar } from "../../../../chunks/breadcrumb-bar.js";
import "../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { B as Button_item } from "../../../../chunks/button-item.js";
import { D as Dropdown_item } from "../../../../chunks/dropdown-item.js";
import "devalue";
import "uid";
import { E as Empty_list } from "../../../../chunks/empty-list.js";
import { I as Item_list } from "../../../../chunks/item-list.js";
import "qrcode";
const Titled_layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `${$$result.head += `<!-- HEAD_svelte-bz965u_START -->${$$result.title = `<title>${escape(title)} | Slide Tracking</title>`, ""}<!-- HEAD_svelte-bz965u_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getContext("prompt");
  let { data } = $$props;
  const toDate = ({ createdAt }) => createdAt;
  const toLink = ({ id }) => ({ href: `/project/${id}` });
  const toName = ({ title }) => title;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1106wzw_START -->${$$result.title = `<title>Projects | Slide Tracking</title>`, ""}<!-- HEAD_svelte-1106wzw_END -->`, ""}

${validate_component(Titled_layout, "TitledLayout").$$render($$result, { title: "Projects" }, {}, {
    default: () => {
      return `${validate_component(Breadcrumb_bar, "Breadcrumb.Bar").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Dropdown_item, "Item.Dropdown").$$render($$result, { title: "My Projects" }, {}, {
            default: () => {
              return `${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Create project
			`;
                }
              })}`;
            }
          })}`;
        }
      })}
	${data.projects.length ? `${validate_component(Item_list, "ItemList").$$render(
        $$result,
        {
          items: data.projects,
          toDate,
          toLink,
          toName
        },
        {},
        {
          "drop-menu": ({ item }) => {
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
            })}`;
          }
        }
      )}` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
        default: () => {
          return `Your projects will appear here when you add them
		`;
        }
      })}`}`;
    }
  })}`;
});
export {
  Page as default
};
