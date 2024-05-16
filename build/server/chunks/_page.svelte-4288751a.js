import { c as create_ssr_component, g as getContext, v as validate_component } from './index3-bf5daf62.js';
import { B as Button_item } from './button-item-730a6055.js';
import './utils-ae3035df.js';
import './index-bf0759ae.js';
import { E as Empty_list } from './empty-list-112822b1.js';
import { I as Item_list } from './item-list-cbf4e47f.js';
import 'qrcode';
import './popup-1109891f.js';
import '@mdi/js';
import 'date-fns';
import './dropmenu-414ee6ce.js';

const css = {
  code: ".files.svelte-50xnyy{padding-block-start:var(--br-size-4)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  getContext("prompt");
  const toDate = ({ createdAt }) => createdAt;
  const toLink = ({ id, name }) => ({
    href: `/api/v1/files/download?id=${id}`,
    download: name
  });
  const toName = ({ name }) => name;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"files svelte-50xnyy"}">${data.files.length ? `${validate_component(Item_list, "ItemList").$$render(
    $$result,
    {
      items: data.files,
      toDate,
      toName,
      toLink
    },
    {},
    {
      "drop-menu": ({ item }) => {
        return `${validate_component(Button_item, "Item.Button").$$render($$result, {}, {}, {
          default: () => {
            return `Delete file
				`;
          }
        })}`;
      }
    }
  )}` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
    default: () => {
      return `Your files will appear here when you add them
		`;
    }
  })}`}
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4288751a.js.map
