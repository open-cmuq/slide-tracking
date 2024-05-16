import { c as create_ssr_component, f as add_attribute } from './index3-bf5daf62.js';
import { c as createEventForwarder } from './popup-1109891f.js';

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

export { Button_item as B };
//# sourceMappingURL=button-item-730a6055.js.map
