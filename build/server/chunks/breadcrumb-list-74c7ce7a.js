import { c as create_ssr_component, b as subscribe, v as validate_component, d as each, e as escape } from './index3-bf5daf62.js';
import { p as page } from './stores-6dcd4f9d.js';
import { L as Link_item } from './link-item-18d93ce3.js';
import './utils-ae3035df.js';
import './index-bf0759ae.js';
import { D as Dropmenu } from './dropmenu-414ee6ce.js';
import 'qrcode';

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

export { Breadcrumb_list as B };
//# sourceMappingURL=breadcrumb-list-74c7ce7a.js.map
