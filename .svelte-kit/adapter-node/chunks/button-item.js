import { c as create_ssr_component, d as add_attribute } from "./index3.js";
import { c as createEventForwarder } from "./popup.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
const css = {
  code: "button[disabled].svelte-fet2z1{opacity:0.7;cursor:not-allowed}",
  map: null
};
const Button_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { disabledHint = null } = $$props;
  createEventForwarder();
  if ($$props.disabledHint === void 0 && $$bindings.disabledHint && disabledHint !== void 0)
    $$bindings.disabledHint(disabledHint);
  $$result.css.add(css);
  return `<button class="${"br-ignore unbutton br-list-item svelte-fet2z1"}" ${Boolean(disabledHint) ? "disabled" : ""}${add_attribute("title", disabledHint, 0)}>${slots.default ? slots.default({}) : ``}
</button>`;
});
export {
  Button_item as B
};
