import { c as create_ssr_component, f as add_attribute } from './index3-bf5daf62.js';

const css = {
  code: "svg.svelte-7kl3f5{width:var(--icon-size, 20px);height:var(--icon-size, 20px);flex:var(--icon-flex, none)}path.svelte-7kl3f5{fill:var(--icon-color, currentColor)}",
  map: null
};
const Mdi_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { d } = $$props;
  if ($$props.d === void 0 && $$bindings.d && d !== void 0)
    $$bindings.d(d);
  $$result.css.add(css);
  return `<svg viewBox="${"0 0 24 24"}" class="${"svelte-7kl3f5"}"><path${add_attribute("d", d, 0)} class="${"svelte-7kl3f5"}"></path></svg>`;
});

var IDX=36, HEX='';
while (IDX--) HEX += IDX.toString(36);

function uid (len) {
	var str='', num = len || 11;
	while (num--) str += HEX[Math.random() * 36 | 0];
	return str;
}

export { Mdi_icon as M, uid as u };
//# sourceMappingURL=index-bf0759ae.js.map
