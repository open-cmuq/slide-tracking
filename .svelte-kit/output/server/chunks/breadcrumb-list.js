import { c as create_ssr_component, b as subscribe, v as validate_component, f as each, e as escape } from "./index3.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
import { p as page } from "./stores.js";
import { L as Link_item } from "./link-item.js";
import "devalue";
import "uid";
import { D as Dropmenu } from "./dropmenu.js";
import "qrcode";
function href(breadcrumb) {
  switch (breadcrumb.type) {
    case "project":
      return `/project/${breadcrumb.id}`;
    case "experiment":
      return `/experiment/${breadcrumb.id}`;
    case "slide":
      return `/slide/${breadcrumb.id}`;
    case "coverslip":
      return `/coverslip/${breadcrumb.id}`;
    default:
      return "";
  }
}
const Breadcrumb_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let breadcrumbs;
  let middleBreadcrumbs;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  ({ breadcrumbs } = $page.data);
  middleBreadcrumbs = breadcrumbs.slice(1, breadcrumbs.length - 1);
  $$unsubscribe_page();
  return `${validate_component(Dropmenu, "DropMenu").$$render($$result, { icon: "dots-horizontal" }, {}, {
    default: () => {
      return `${each(middleBreadcrumbs, (breadcrumb) => {
        return `${validate_component(Link_item, "LinkItem").$$render($$result, { href: href(breadcrumb) }, {}, {
          default: () => {
            return `${escape(breadcrumb.title)}
		`;
          }
        })}`;
      })}`;
    }
  })}`;
});
export {
  Breadcrumb_list as B
};
