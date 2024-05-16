import { c as create_ssr_component, d as each, f as add_attribute, e as escape, v as validate_component, j as compute_slots } from './index3-bf5daf62.js';
import { isToday, format } from 'date-fns';
import './utils-ae3035df.js';
import './index-bf0759ae.js';
import { D as Dropmenu } from './dropmenu-414ee6ce.js';
import 'qrcode';

const css = {
  code: ".list.svelte-pbkwb8.svelte-pbkwb8{--item-list-gap:var(--br-size-4)}.list.svelte-pbkwb8.svelte-pbkwb8{display:grid;--name-column:minmax(var(--br-size-16), 1fr);--created-by-column:var(--br-size-16);--created-at-column:var(--br-size-14);--dropmenu-column:var(--br-size-8);--gtc-mobile-up:var(--name-column) var(--created-by-column);--gtc-desktop-up:var(--name-column) var(--created-by-column) var(--created-at-column);grid-template-columns:var(--br-mobile, var(--gtc-mobile-up))\n			var(--br-tablet-portrait, var(--gtc-mobile-up))\n			var(--br-tablet-landscape, var(--gtc-mobile-up))\n			var(--br-desktop, var(--gtc-desktop-up))\n			var(--br-big-desktop, var(--gtc-desktop-up));gap:0 var(--item-list-gap)}.list.drop-menu.svelte-pbkwb8.svelte-pbkwb8{--gtc-mobile-up:var(--name-column) var(--created-at-column) var(--dropmenu-column);--gtc-desktop-up:var(--name-column) var(--created-by-column) var(--created-at-column) var(--dropmenu-column)}.cell.drop-menu.svelte-pbkwb8.svelte-pbkwb8{display:flex;justify-content:center}.list.svelte-pbkwb8:not(.drop-menu) .drop-menu.svelte-pbkwb8{display:none}a.svelte-pbkwb8.svelte-pbkwb8{display:contents}.cell.svelte-pbkwb8.svelte-pbkwb8{display:flex;align-items:center;height:var(--br-size-10);position:relative}.cell.first.svelte-pbkwb8.svelte-pbkwb8{padding-inline-start:var(--br-size-3)}.cell.last.svelte-pbkwb8.svelte-pbkwb8{padding-inline-end:var(--br-size-3)}.cell.svelte-pbkwb8.svelte-pbkwb8:after{display:block;content:' ';position:absolute;border-bottom:var(--br-global-border);width:calc(100% + var(--item-list-gap));transform:translateX(-50%);left:50%;bottom:0}.cell.first.svelte-pbkwb8.svelte-pbkwb8:after{left:calc(50% + var(--item-list-gap) / 2)}.cell.last.svelte-pbkwb8.svelte-pbkwb8:after{left:calc(50% - var(--item-list-gap) / 2)}.head.svelte-pbkwb8.svelte-pbkwb8{font-weight:600;height:var(--br-size-9)}.owner.svelte-pbkwb8.svelte-pbkwb8{--display-mobile-up:none;--display-desktop-up:flex;display:var(--br-mobile, var(--display-mobile-up))\n			var(--br-tablet-portrait, var(--display-mobile-up))\n			var(--br-tablet-landscape, var(--display-mobile-up))\n			var(--br-desktop, var(--display-desktop-up))\n			var(--br-big-desktop, var(--display-desktop-up))}",
  map: null
};
const Item_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { items } = $$props;
  let { toDate } = $$props;
  let { toLink = () => null } = $$props;
  let { toName } = $$props;
  function renderDate(dirtyDate) {
    const date = new Date(dirtyDate);
    if (isToday(date))
      return format(date, "h:mm a");
    return format(date, "MMM dd, yyyy");
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.toDate === void 0 && $$bindings.toDate && toDate !== void 0)
    $$bindings.toDate(toDate);
  if ($$props.toLink === void 0 && $$bindings.toLink && toLink !== void 0)
    $$bindings.toLink(toLink);
  if ($$props.toName === void 0 && $$bindings.toName && toName !== void 0)
    $$bindings.toName(toName);
  $$result.css.add(css);
  return `<div class="${["list svelte-pbkwb8", $$slots["drop-menu"] ? "drop-menu" : ""].join(" ").trim()}"><div class="${"head cell name first svelte-pbkwb8"}">Name</div>
	<div class="${"head cell owner svelte-pbkwb8"}">Owner</div>
	<div class="${["head cell svelte-pbkwb8", !$$slots["drop-menu"] ? "last" : ""].join(" ").trim()}">Created at</div>
	<div class="${"head cell drop-menu last svelte-pbkwb8"}"></div>
	${each(items, (item) => {
    let date = toDate(item), link = toLink(item);
    return `
		
		${link ? `<a${add_attribute("href", link.href, 0)}${add_attribute("download", link.download || null, 0)} class="${"svelte-pbkwb8"}"><div class="${"cell name first svelte-pbkwb8"}"><div class="${"overflow-ellipsis"}">${escape(toName(item))}
					</div></div>
				<div class="${"cell owner svelte-pbkwb8"}">${escape(item.createdBy.name)}</div>
				<div class="${"cell svelte-pbkwb8"}">${escape(renderDate(date))}</div>
			</a>` : `<div class="${"cell name first svelte-pbkwb8"}"><div class="${"overflow-ellipsis"}">${escape(toName(item))}
				</div></div>
			<div class="${"cell owner svelte-pbkwb8"}">${escape(item.createdBy.name)}</div>
			<div class="${["cell svelte-pbkwb8", !$$slots["drop-menu"] ? "last" : ""].join(" ").trim()}">${escape(renderDate(date))}</div>`}
		${$$slots["drop-menu"] ? `<div class="${"cell last svelte-pbkwb8"}">${validate_component(Dropmenu, "DropMenu").$$render($$result, {}, {}, {
      default: () => {
        return `${slots["drop-menu"] ? slots["drop-menu"]({ item }) : ``}
				`;
      }
    })}
			</div>` : ``}`;
  })}
</div>`;
});

export { Item_list as I };
//# sourceMappingURL=item-list-cbf4e47f.js.map
