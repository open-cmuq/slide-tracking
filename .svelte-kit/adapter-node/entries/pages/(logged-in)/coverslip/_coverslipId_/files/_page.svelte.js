import { c as create_ssr_component, g as getContext, v as validate_component } from "../../../../../../chunks/index3.js";
import "../../../../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { B as Button_item } from "../../../../../../chunks/button-item.js";
import "devalue";
import "uid";
import { E as Empty_list } from "../../../../../../chunks/empty-list.js";
import { I as Item_list } from "../../../../../../chunks/item-list.js";
import "qrcode";
const _page_svelte_svelte_type_style_lang = "";
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
export {
  Page as default
};
