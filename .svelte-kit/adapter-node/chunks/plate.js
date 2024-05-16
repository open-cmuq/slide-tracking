import { c as create_ssr_component, b as subscribe, f as each, e as escape, d as add_attribute } from "./index3.js";
import { c as createQRCode } from "./slide.js";
import { p as page } from "./stores.js";
import "./coverslipTable.svelte_svelte_type_style_lang.js";
const css = {
  code: ".plate.svelte-79lyin{width:var(--st-plate-width);aspect-ratio:1.2}.plate-top.svelte-79lyin{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;gap:4px;background-color:var(--br-dark, rgba(255,255,255, 0.1))\n			var(--br-light, rgba(0, 0, 0, 0.05))}.row-labels.svelte-79lyin{display:grid;grid-template-rows:repeat(9, 1fr);align-items:center;justify-content:right;text-align:right;padding:10px 1px}.col-labels.svelte-79lyin{display:grid;grid-template-columns:repeat(12, 1fr);justify-content:start;align-items:center;padding:0px 10px}.plate-content.svelte-79lyin{display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr;align-items:start;width:100%}.label.svelte-79lyin{font-weight:bold;padding:0.2rem 0.5rem}.plate-surface.svelte-79lyin{display:grid}.plate-label.svelte-79lyin{border-top:var(--st-border);width:100%;height:24%;min-height:0;display:grid;align-items:center;justify-content:center;background-color:rgba(255, 255, 255, 0.75)}svg.svelte-79lyin{height:80%;aspect-ratio:1;opacity:0.75}path.svelte-79lyin{stroke:#000}",
  map: null
};
const Plate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { slideId = "" } = $$props;
  let svgPath;
  let svgSize;
  function updateQrCode(slideId2) {
    if (!slideId2)
      return;
    ({ svgPath, svgSize } = createQRCode($page.url, slideId2));
  }
  if ($$props.slideId === void 0 && $$bindings.slideId && slideId !== void 0)
    $$bindings.slideId(slideId);
  $$result.css.add(css);
  {
    updateQrCode(slideId);
  }
  $$unsubscribe_page();
  return `<div class="${"plate svelte-79lyin"}"><div class="${"plate-top svelte-79lyin"}"><div class="${"row-labels svelte-79lyin"}">${each(Array(9), (_, i) => {
    return `${i == 0 ? `<div class="${"label  svelte-79lyin"}">${escape(" ")}</div>` : `<div class="${"label svelte-79lyin"}">${escape(String.fromCharCode(65 + i - 1))}</div>`}`;
  })}</div>
        <div class="${"plate-content svelte-79lyin"}"><div class="${"col-labels svelte-79lyin"}">${each(Array(12), (_, i) => {
    return `<div class="${"label svelte-79lyin"}">${escape(i + 1)}</div>`;
  })}</div>
            <div class="${"plate-surface svelte-79lyin"}">${slots.default ? slots.default({}) : ``}</div></div></div>
    <div class="${"plate-label svelte-79lyin"}">${slideId ? `<svg id="${"id" + escape(slideId, true)}" viewBox="${"0 0 " + escape(svgSize, true) + " " + escape(svgSize, true)}" class="${"print svelte-79lyin"}"><path${add_attribute("d", svgPath, 0)} class="${"svelte-79lyin"}"></path></svg>` : ``}</div>
	
</div>`;
});
export {
  Plate as P
};
