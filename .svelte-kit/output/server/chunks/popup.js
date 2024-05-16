import { c as create_ssr_component, k as get_current_component, l as listen, p as bubble, i as compute_slots } from "./index3.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
const css$2 = {
  code: "div.svelte-1pv59d6{position:absolute;top:var(--br-dropdown-arrow-top);left:var(--br-dropdown-arrow-left);right:var(--br-dropdown-arrow-right);bottom:var(--br-dropdown-arrow-bottom);background-color:inherit;height:var(--br-dropdown-arrow-height);width:var(--br-dropdown-arrow-width);transform:rotate(var(--rotate));clip-path:polygon(0 0, 0% 100%, 100% 100%);border-radius:0 4px;box-shadow:inherit}div.svelte-1pv59d6{--rotate-top:var(--br-dropdown-arrow-side-top) 315deg;--rotate-bottom:var(--br-dropdown-arrow-side-bottom) 135deg;--rotate-left:var(--br-dropdown-arrow-side-left) 225deg;--rotate-right:var(--br-dropdown-arrow-side-right) 45deg;--rotate:var(--rotate-top, var(--rotate-bottom, var(--rotate-left, var(--rotate-right))))}",
  map: null
};
const Arrow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"br-arrow svelte-1pv59d6"}"></div>`;
});
function createEventForwarder() {
  const component = get_current_component();
  return (node) => {
    for (const event in component.$$.callbacks) {
      if ({}.hasOwnProperty.call(component.$$.callbacks, event)) {
        const removeListener = listen(node, event, (event2) => {
          bubble(component, event2);
        });
        component.$$.on_destroy.push(removeListener);
      }
    }
  };
}
function createAddEventListener() {
  const component = get_current_component();
  return (node, event, handler, options) => {
    const removeListener = listen(node, event, handler, options);
    component.$$.on_destroy.push(removeListener);
    return removeListener;
  };
}
const css$1 = {
  code: "div.svelte-cdspn4{display:contents;--br-dropdown-popup-show:hidden}div.has-trigger.show.svelte-cdspn4{--br-dropdown-popup-show: }",
  map: null
};
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  createAddEventListener();
  let { placement = "bottom" } = $$props;
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  $$result.css.add(css$1);
  return `


${slots.trigger ? slots.trigger({}) : ``}
<div class="${[
    "svelte-cdspn4",
    ($$slots.trigger ? "has-trigger" : "") + " "
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const css = {
  code: "div.svelte-zrdtxy{position:absolute;top:var(--br-dropdown-popup-top);left:var(--br-dropdown-popup-left);padding-block:var(--br-dropdown-popup-padding-block);padding-inline:var(--br-dropdown-popup-padding-inline);background-color:var(--br-dropdown-popup-background-color);border-radius:var(--br-dropdown-popup-border-radius);visibility:var(--br-dropdown-popup-show, var(--br-dropdown-popup-visibility));gap:var(--br-dropdown-popup-gap);display:flex;flex-direction:column;box-shadow:var(--br-dropdown-popup-box-shadow);z-index:100000;min-width:var(--br-dropdown-popup-min-width, var(--br-size-15))}",
  map: null
};
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"svelte-zrdtxy"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Arrow as A,
  Dropdown as D,
  Popup as P,
  createEventForwarder as c
};
