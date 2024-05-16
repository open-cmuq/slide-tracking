import { c as create_ssr_component, h as createEventDispatcher, f as add_attribute, q as add_styles, b as subscribe, e as escape } from './index3-bf5daf62.js';
import { create } from 'qrcode';
import { p as page } from './stores-6dcd4f9d.js';

const css$1 = {
  code: ".coverslip.svelte-8acoe0{width:calc(var(--st-slide-width) * 0.45);aspect-ratio:1;background-color:var(--br-dark, rgba(255,255,255, 0.1))\n			var(--br-light, rgba(0, 0, 0, 0.05));display:flex;align-items:center;justify-content:center;font-size:20px;border-radius:2px;cursor:pointer;transform:translate(-50%, -50%);left:calc(var(--pos-x) * 100%);top:calc(var(--pos-y) * 100%)}div.coverslip.active.svelte-8acoe0{cursor:default}.slide-surface .coverslip.svelte-8acoe0{position:absolute}.coverslip.round.svelte-8acoe0{border-radius:50%}.coverslip.active.svelte-8acoe0{background-color:var(--br-dark, hsl(225deg 100% 60%))\n			var(--br-light, hsl(225deg 100% 55%))}.coverslip.draggable.svelte-8acoe0{cursor:grab}.coverslip.dragging{user-select:none;cursor:grabbing !important}",
  map: null
};
const SEARCH_MIN_X = 0.275;
const SEARCH_MIN_Y = 0.125;
const Coverslip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let positionX;
  let positionY;
  let shape;
  let { active = false } = $$props;
  let { draggable = false } = $$props;
  let { href = "" } = $$props;
  let { position = "drag" } = $$props;
  let { coverslip } = $$props;
  createEventDispatcher();
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0)
    $$bindings.draggable(draggable);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.coverslip === void 0 && $$bindings.coverslip && coverslip !== void 0)
    $$bindings.coverslip(coverslip);
  $$result.css.add(css$1);
  ({ positionX = SEARCH_MIN_X, positionY = SEARCH_MIN_Y, shape = "round" } = coverslip);
  return `${href ? `<a${add_attribute("href", href, 0)} class="${[
    "coverslip svelte-8acoe0",
    (active ? "active" : "") + " " + (shape === "round" ? "round" : "") + " " + (draggable ? "draggable" : "")
  ].join(" ").trim()}"${add_styles({
    "--pos-x": positionX,
    "--pos-y": positionY
  })}>${slots.default ? slots.default({}) : ``}</a>` : `<div class="${[
    "coverslip svelte-8acoe0",
    (active ? "active" : "") + " " + (shape === "round" ? "round" : "") + " " + (draggable ? "draggable" : "")
  ].join(" ").trim()}"${add_styles({
    "--pos-x": positionX,
    "--pos-y": positionY
  })}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
function svgCmd(cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== "undefined")
    str += ` ${y}`;
  return str;
}
function qrToPath(options) {
  const { data, size, margin = 0 } = options;
  let path = "";
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);
    if (!col && !newRow)
      newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd("h", lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
function createQRCode(url, slideId) {
  const slideUrl = new URL(`${url.protocol}//${url.host}`);
  slideUrl.pathname = `/slide/${slideId}`;
  const qrCode = create(slideUrl.href, { errorCorrectionLevel: "H" });
  const { data, size } = qrCode.modules;
  return {
    svgSize: size,
    svgPath: qrToPath({
      data: Array.from(data),
      size
    })
  };
}
const css = {
  code: ".slide.svelte-mwm18m{width:var(--st-slide-width);aspect-ratio:1/3;display:grid;grid-template-rows:3fr 1fr;box-shadow:var(--st-box-shadow);background-color:var(--br-dark, rgba(255,255,255, 0.1))\n			var(--br-light, rgba(0, 0, 0, 0.05))}.slide-surface.svelte-mwm18m{position:relative}.slide-label.svelte-mwm18m{border-top:var(--st-border);min-height:0;display:grid;align-items:center;justify-content:center;background-color:rgba(255, 255, 255, 0.75)}svg.svelte-mwm18m{height:80%;aspect-ratio:1;opacity:0.75}path.svelte-mwm18m{stroke:#000}",
  map: null
};
const Slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `<div class="${"slide svelte-mwm18m"}"><div class="${"slide-surface svelte-mwm18m"}">${slots.default ? slots.default({}) : ``}</div>
	<div class="${"slide-label svelte-mwm18m"}">${slideId ? `<svg id="${"id" + escape(slideId, true)}" viewBox="${"0 0 " + escape(svgSize, true) + " " + escape(svgSize, true)}" class="${"print svelte-mwm18m"}"><path${add_attribute("d", svgPath, 0)} class="${"svelte-mwm18m"}"></path></svg>` : ``}</div>
</div>`;
});

export { Coverslip as C, Slide as S, createQRCode as c };
//# sourceMappingURL=slide-8a6aa189.js.map
